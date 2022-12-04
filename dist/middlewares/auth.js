"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddlewares = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
require('dotenv/config');
function AuthMiddlewares(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Token not provided!" });
    }
    const [, token] = authorization.split(" ");
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWTTOKEN_SECRET);
        const { id } = decoded;
        req.userId = id;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Token invalid!" });
    }
}
exports.AuthMiddlewares = AuthMiddlewares;
