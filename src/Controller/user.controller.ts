import { Request, Response } from "express";
import db from "../Database/connection";
import Authentication from "../authentication";

const auth = new Authentication();

export default class UsersController {
  async index(req: Request, res: Response) {
    const users = await db("users").select("id","email", "username");

    res.status(200).json(users);
  }
  async create(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const trx = await db.transaction();
    const hashedPassword = await auth.hashPassword(password);
    const user = { username, email, password: hashedPassword };
    try {
      await trx("users").insert(user);
      await trx.commit();
      return res.status(201).send();
    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        message: "Error while creating user",
      });
    }
  }
  async loginAuthentication(req: Request, res: Response) {
    const { email, password } = req.body;

    const userInDB = await db("users").select("*").where("email", "=", email);
    if (userInDB.length > 0) {
      const hashPass = await db("users").select("password");

      const isValid = await auth.comparePassword(
        password,
        hashPass[0].password
      );
      if (isValid) {
        return res.status(200).json({ message: "Authenticated" });
      } else {
        return res.status(401).json({ message: "Not authenticated" });
      }
    }
  }
}
