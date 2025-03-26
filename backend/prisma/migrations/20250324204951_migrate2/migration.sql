-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AnimalImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "AnimalImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnimalImage" ADD CONSTRAINT "AnimalImage_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
