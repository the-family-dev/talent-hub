import { Request, Response } from "express";
import { BaseController } from "./base.controller";

export class PingController extends BaseController {
  public ping = async (req: Request, res: Response) => {
    console.log(this);

    if (Math.random() > 0.5) {
      throw new Error("Случайная ошибка в ping!");
    }

    this.success(res, {
      title: "Pong",
    });
  };
}
