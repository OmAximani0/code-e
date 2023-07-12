import express from "express";
import { connect_db } from "./db/index.mjs";

const PORT = process.env.PORT || 5000;

const app = express();

// Initialize database connection
connect_db();

// Middlewares
app.use(express.json());

import { UserRoute } from "./routes/index.mjs";

app.use("/users", UserRoute);

app.get("/", (_, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`LISTEN: http://localhost:${PORT}/`);
});
