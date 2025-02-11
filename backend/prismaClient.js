// Prisma Entity to interact with PostgreSQL database

const { PrismaClient, Prisma } = require ('@prisma/client');

const prisma = new PrismaClient()

module.exports = prisma;