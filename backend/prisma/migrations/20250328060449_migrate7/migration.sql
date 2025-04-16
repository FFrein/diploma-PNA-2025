/*
  Warnings:

  - You are about to drop the column `isNotified` on the `TelegramUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TelegramUser" DROP COLUMN "isNotified",
ADD COLUMN     "animalNotified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "newsNotified" BOOLEAN NOT NULL DEFAULT false;
