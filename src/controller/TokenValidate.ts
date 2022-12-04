import { Request, Response } from "express";
import { prisma } from "../utils/prisma";


export class TokenValidate {
    async index(req: Request, res: Response){
        const user = await prisma.user.findUnique({
            where: {email: req.body.email}
        });
        if(user){
            return res.json({ 
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        }else return res.status(404).json({ error: "User not found!"});
        
    }

    
}