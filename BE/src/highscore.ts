import { prisma } from "..";
import { auth } from "../middlewares/auth";
import { app } from "./import";
import type { Request, Response } from "express";


app.put("/updateScore", auth, async (req: Request, res: Response) => {
    
    const score = req.body.score as number;
    if (!score)
    {
        return res.status(400).json({
            success: false,
            error: "Invalid Request Schema"
        });
    }
    
    const obj = await prisma.user.findUnique({
        where: {
            id: req.id
        },
        select: {
            highest: true
        }
    });
    
    if (!obj)
    {
        return res.status(409).json({
            success: false,
            error: "User Not found"
        });
    }
    
    
    if (obj.highest! >= score)
    {
        return res.status(409).json({
            success: false,
            error: "User with email already exists"
        });
    }
    
    await prisma.user.update({
        where: {
            id: req.id
        },
        data: {
            highest: {
                set: score
            }
        }
    });
    
    return res.status(200).json({
        success: true,
        data: {
            score: score
        }
    });
})