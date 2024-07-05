import { Response } from "express";

export const sendRes = (_: any, res: Response, next: any) => {
  res.sendRes = (response: any) => {
    res.send({ success: true, response });
  };

  next();
};
