import {Request, Response} from "express";
import db from "../database/connection";
import * as EmailValidator from "email-validator";


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

  async findOne(req: Request, res:Response) {
    const {email} = req.body;

    if(!EmailValidator.validate(email)) {
      return res.status(400).json({message: "Invalid email"});
    }

    try {
      const userFound = await db('users').where({email});

      if(!userFound) {
        return res.status(400).json({message: "User not found"});
      }

      return res.status(200).json(userFound);

    } catch (error) {
      return res.status(400).json({
        error
      });
    }
    
  }
}