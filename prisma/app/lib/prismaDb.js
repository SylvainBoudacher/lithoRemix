"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prismaClientSingleton = function () {
    return new client_1.PrismaClient();
};
var globalForPrisma = global;
var prisma = globalForPrisma.prisma || prismaClientSingleton();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
exports.default = prisma;
