import { Request, Response } from "express";

const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).send("The requested endpoint was not found.");
};

export default notFoundMiddleware;