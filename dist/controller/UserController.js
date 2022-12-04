"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../utils/prisma");
class UserController {
    async index(req, res) {
        const users = await prisma_1.prisma.user.findMany();
        return res.json({ users });
    }
    async store(req, res) {
        const { name, email, role, password } = req.body;
        const userExists = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.json({ error: "User exists" });
        }
        const hash_password = await (0, bcryptjs_1.hash)(password, 8);
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                role,
                password: hash_password,
            },
        });
        return res.json({ user });
    }
}
exports.UserController = UserController;
