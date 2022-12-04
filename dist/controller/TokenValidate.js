"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidate = void 0;
const prisma_1 = require("../utils/prisma");
class TokenValidate {
    async index(req, res) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: req.body.email }
        });
        if (user) {
            return res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        }
        else
            return res.status(404).json({ error: "User not found!" });
    }
}
exports.TokenValidate = TokenValidate;
