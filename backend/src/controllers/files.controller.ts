import { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";

// Создаём папки для загрузок
const uploadDirs = {
  images: path.join(__dirname, "../../uploads/images"),
  pdfs: path.join(__dirname, "../../uploads/pdfs"),
};

Object.values(uploadDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Настройка хранилища
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, uploadDirs.images);
    else if (file.mimetype === "application/pdf") cb(null, uploadDirs.pdfs);
    else cb(new Error("Неподдерживаемый тип файла"), "");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Фильтр по типу файла
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
  const allowedPdfTypes = ["application/pdf"];

  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedPdfTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Файл должен быть изображением или PDF"));
  }
};

// Ограничения по размеру
const limits = {
  fileSize: 10 * 1024 * 1024, // Максимум 10 МБ
};

// Экспортируем multer
export const upload = multer({ storage, fileFilter, limits });
