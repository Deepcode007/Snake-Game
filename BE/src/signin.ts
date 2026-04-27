import { prisma } from "..";
import { token } from "../middlewares/token";
import { loginzod } from "../zod/Loginzod";
import { app, bcrypt } from "./import";
import type { Request, Response } from "express";

app.post("/signin", async (req: Request, res: Response) => {
    const result = loginzod.safeParse(req.body);
    
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
    
    if (!user || !bcrypt.compareSync(result.data.password, user.password))
    {
        return res.status(44).json({
            success: false,
            error: "Invalid Credentials"
        });
    }
    
    return res.status(200).json({
        success: true,
        data: {
            token: token(user.email, user.id)
        }
    })
})
