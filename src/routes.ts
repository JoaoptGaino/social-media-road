import express from "express";
import UsersController from "./Controller/user.controller";
import PostsController from "./Controller/posts.controller";
const routes = express.Router();
const users = new UsersController();
const posts = new PostsController();

routes.get("/users", users.index);
routes.post("/users", users.create);
routes.post("/login", users.loginAuthentication);

routes.get("/posts/:user_id", posts.index);
routes.post("/posts/:user_id", posts.create);
routes.post("/reaction/:post_id",posts.like);
routes.get("/", (req, res) => {
  res.json({
    message: "Hello from routes",
  });
});

export default routes;
