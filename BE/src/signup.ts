import { prisma } from "..";
import { signupzod } from "../zod/Signupzod";
import { app, bcrypt } from "./import";
import type { Request, Response } from "express";


app.post("/signup", async (req: Request, res: Response) => {
    const result = signupzod.safeParse(req.body);
    
    if (!result.success)
    {
        return res.status(400).json({
            success: false,
            error: "Invalid Request Schema"
        });
    }
    
    const user = await prisma.user.findUnique({
        where: {
            email: result.data.email
        }
    })
    
    if (user)
    {
        return res.status(409).json({
            success: false,
            error: "User with email already exists"
        });
    }
    
    result.data.password = await bcrypt.hash(result.data.password, 10);
    
    const newUser = await prisma.user.create({
        data: result.data
    });
    
    res.status(200).json({
        success: true,
        data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
    
})