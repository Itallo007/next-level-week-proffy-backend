import {Request, Response} from "express";
import db from "../database/connection";


export default class UserController {
  async create(req: Request,res: Response) {
    const {
      name,
      lastName,
      email,
      password
    } = req.body;

    const trx = await db.transaction();

    try {
      await trx('users').insert({
        name,
        lastName,
        email,
        password,
        avatar: "",
        bio: "",
        whatsapp: ""
      });

      trx.commit();

      return res.status(201).send();

    } catch (error) {
      trx.rollback();
      
      return res.status(400).json({
        error,
        message: "Unexpected error while creating new user"
      });
    }
  }
}