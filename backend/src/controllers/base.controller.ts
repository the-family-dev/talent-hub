// base.controller.ts
import { Response } from "express";

export abstract class BaseController {
  /**
   * Успешный ответ
   */
  protected success(res: Response, data?: any): Response {
    return res.status(200).json(data);
  }

  /**
   * Ответ с ошибкой
   */
  protected error(
    res: Response,
    error?: any,
    statusCode: number = 500
  ): Response {
    return res.status(statusCode).json(error);
  }
}
