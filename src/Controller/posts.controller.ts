import { Request, Response } from "express";
import db from "../Database/connection";

export default class PostsController {
  async index(req: Request, res: Response) {
    const { user_id } = req.params;
    const postsFromUser = await db("reactions")
      .select("reactions.post_id","username as Nome", "posts.post")
      .count("* as likes")
      .join("posts", "reactions.post_id", "=", "posts.id")
      .join("users", "posts.user_id", "=", "users.id")
      .where("user_id", "=", user_id)
      .groupBy("reactions.post_id","posts.post","username");

    return res.json(postsFromUser);
  }
  async showAll(req:Request,res:Response){
    const allPosts = await db("reactions")
    .select("reactions.post_id","posts.post")
    .count('* as likes')
    .from("reactions")
    .join("posts","reactions.post_id","=","posts.id")
    .groupBy("reactions.post_id","posts.post");

    return res.status(200).json(allPosts);
  }
  async create(req: Request, res: Response) {
    const { user_id } = req.params;
    const { post } = req.body;
    const trx = await db.transaction();
    const insertPost = { post, user_id };
    try {
      await trx("posts").insert(insertPost);
      await trx.commit();
      return res.status(201).send();
    } catch (err) {
      await trx.rollback();
      console.log(err);
      return res.status(500).json({
        message: "Internal error",
      });
    }
  }
  async like(req: Request, res: Response) {
    const { post_id } = req.params;
    const trx = await db.transaction();
    const likeCount = { post_id };
    try {
      await trx("reactions").insert(likeCount);
      await trx.commit();
      return res.status(201).send();
    } catch (err) {
      await trx.rollback();
      return res.status(500).json({
        message: "Internal error",
      });
    }
  }
}
