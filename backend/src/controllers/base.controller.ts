// base.controller.ts
import { Response } from "express";

export abstract class BaseController {
  /**
   * Успешный ответ
   */
  protected success<T>(res: Response, data?: any): Response {
    return res.status(200).json(data);
  }

  /**
   * Ответ с ошибкой
   */
  protected error(
    res: Response,
    message: string = "error occurred",
    statusCode: number = 500
  ): Response {
    const response = {
      success: false,
      message,
    };

    return res.status(statusCode).json(response);
  }
}
