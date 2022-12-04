"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = require("../utils/prisma");
require('dotenv/config');
class AuthController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.json({ error: "User not found!" });
        }
        const isValuePassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isValuePassword) {
            return res.json({ error: "Password invalid!" });
        }
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, process.env.JWTTOKEN_SECRET, { expiresIn: "1d" });
        //@ts-ignore
        const { id, role } = user;
        return res.json({ user: { id, email, role }, token });
    }
}
exports.AuthController = AuthController;
