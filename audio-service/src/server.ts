import express, { Express, Response, Request } from "express";

const app: Express = express()

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" })
})

export { app }