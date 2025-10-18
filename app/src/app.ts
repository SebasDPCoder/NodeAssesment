/**
 * It is only responsible for configuring the Express application: middlewares, routes, swagger, etc.
 * It does not start the server or touch the database.
 * This makes the application easily testable, because we can import the app into our tests without having to launch the real server or connect to the database.
*/

import express from "express";
import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes"
import roleRoutes from "./routes/role.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { productRoutes } from "./routes";

const app = express();

app.use(express.json());

// Router
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/role", roleRoutes)


// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
