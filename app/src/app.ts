/**
 * It is only responsible for configuring the Express application: middlewares, routes, swagger, etc.
 * It does not start the server or touch the database.
 * This makes the application easily testable, because we can import the app into our tests without having to launch the real server or connect to the database.
*/

import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes"
import orderStatusRoutes from "./routes/order_status.routes";
import roleRoutes from "./routes/role.routes";
import addressRoutes from "./routes/address.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

const app = express();

app.use(express.json());

// Router
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/order_status", orderStatusRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/address", addressRoutes);


// Products Route
app.use("/api/products", productRoutes);


// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
