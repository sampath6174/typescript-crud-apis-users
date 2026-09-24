import express from "express";

import userRoutes from "./routes/userRoutes";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use(notFoundMiddleware);


export default app;