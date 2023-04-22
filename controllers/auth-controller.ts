import { Request, Response, NextFunction } from "express";
import * as services from "../services";
import { User } from "../models"


//! Encrypt the password with bcryptjs
let RegistrationHandler = async function(req: Request, res: Response, next: NextFunction) {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password
    let phone = req.body.phone
    let photo = req.file

    let NewUser: User = {
        firstName,
        lastName,
        email,
        password,
        phone
    }

    if(photo !== undefined) {
        NewUser.photo = photo.destination
    }

    try {
        let checkStatus = await services.CheckUserByNames(firstName, lastName)
        
        if(checkStatus) {
            res.status(200).json({msg: "user already exists, please log in"})
        } else {
            
            let addStatus = await services.AddUser(NewUser)
            
            if(addStatus) {
                res.status(201).json({msg: "user registered successfully!"})
            } else {
                const error = new Error("unable to add user!")
                throw error
            }
        }
    } catch(e) {
        next(e)
    }

}

//! use bcrypt to decrypt the passsword after adding encryption
let LogInHandler = async function(req: Request, res: Response, next: NextFunction) {
    let email = req.body.email
    let passsword = req.body.passsword

    try {
        let getStatus = await services.GetUserByEmailAndPass(email, passsword)
        
        if(getStatus) {
            if(typeof getStatus === "string") {
                res.status(404).json({msg: getStatus})
            } else {
                res.status(200).json({msg: true, token: "some auth token"})
            }
        }

    } catch(e) {
        next(e)
    }
}

export {
    RegistrationHandler,
    LogInHandler
}