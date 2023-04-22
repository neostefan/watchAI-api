import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import { authRouter } from "./routes";

const app = express()
const multerInstance = multer({  })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(multerInstance.single('photo'))
app.use("/auth", authRouter)

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({ error: error.message })
})

app.listen(5001, async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/watchai")
        console.log("server up and running")
    } catch(e) {
        process.exit(1)
    }
})