import { User, Users } from "../models";

//checks if a user exists based on the firstName, lastName
async function CheckUserByNames(firstName: string, lastName: string): Promise<boolean> {
   return new Promise(async (resolve, reject) => {
        try {
            let user = await Users.findOne({firstName, lastName})
            if(user){
                resolve(true)
            } else {
                resolve(false)
            }
        } catch(e) {
            reject(e)
        }
   })
}

//add a user
async function AddUser(nU: User): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            let NewUser = await new Users({
                ...nU
            })

            let savedNewUser = await NewUser.save()

            if(savedNewUser) {
                resolve(true)
            }

            resolve(false)
        } catch(e) {
            reject(e)
        }
    })
}

//gets a user by the userId
async function GetUserById(userId: string): Promise<User | string> {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await Users.findById(userId)
            
            if(user) {
                resolve(user)
            }

            resolve(`no user found with id: ${userId}`)

        } catch(e) {
            reject(e)
        }
    })
}

//get a user by email and password
async function GetUserByEmailAndPass(email: string, password: string): Promise<User | string> {
    return new Promise(async (resolve, reject) => {
        try {
            let foundUser = await Users.findOne({email, password})

            if(foundUser) {
                resolve(foundUser)
            }

            resolve(`no user found with email: ${email} and password ${password}`)
        } catch(e) {
            reject(e)
        }
    })
}

export {
    CheckUserByNames,
    AddUser,
    GetUserById,
    GetUserByEmailAndPass,
}