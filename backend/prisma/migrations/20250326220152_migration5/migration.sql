/*
  Warnings:

  - Added the required column `gender` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('new', 'saled', 'dead');

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "gender" "gender" NOT NULL,
ADD COLUMN     "status" "status" NOT NULL;

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "iamge" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
