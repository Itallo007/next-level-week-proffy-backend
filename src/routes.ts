import express from "express";
import ClassesController from "./controllers/ClassesController";
import ConnectionsController from "./controllers/ConnectionsController";
import UserController from "./controllers/UsersController";


const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const userController = new UserController();

routes.post("/classes", classesController.create);
routes.get("/classes", classesController.index);

routes.post("/connections", connectionsController.create);
routes.get("/connections", connectionsController.index);

routes.post("/register", userController.create);

export default routes;