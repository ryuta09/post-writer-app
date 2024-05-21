/*
  Warnings:

  - You are about to drop the column `toekn_type` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "toekn_type",
ADD COLUMN     "token_type" TEXT;
