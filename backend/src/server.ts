import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { apiRoutes } from "./routes";
import path from "path";

const app: Application = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические папки
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "../uploads/images"))
);
app.use(
  "/uploads/pdfs",
  express.static(path.join(__dirname, "../uploads/pdfs"))
);

app.use("/", apiRoutes);

// Централизованный обработчик ошибок (должен быть последним!)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Ошибка:", error.message);

  res.status(500).json({
    success: false,
    message: "Внутренняя ошибка сервера",
  });
});

// Обработка несуществующих маршрутов
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Маршрут не найден",
  });
});

app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});
