import { Router } from "express";

import SessionController from "./app/controllers/SessionController";
import UserController from "./app/controllers/UserController";
import ProductController from "./app/controllers/ProductController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/sessions", SessionController.store);
routes.post("/users", UserController.store);

routes.use(authMiddleware);

routes.put("/users", UserController.update);

routes.get("/products", ProductController.index);
routes.get("/product", ProductController.show);
routes.post("/products", ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id/:user_id", ProductController.delete);

export default routes;
