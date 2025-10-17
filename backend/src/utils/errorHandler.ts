import { NextFunction, Request, Response } from "express";

// Обертка для асинхронных обработчиков
export const asyncHandlerWrapper =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
