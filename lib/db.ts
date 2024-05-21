import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  var cashePrisma: PrismaClient
}

let prisma: PrismaClient

if(process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if(!global.cashePrisma) {
    global.cashePrisma = new PrismaClient()
  }
  prisma = global.cashePrisma
}

export const db = prisma;