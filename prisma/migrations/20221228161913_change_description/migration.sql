/*
  Warnings:

  - You are about to drop the column `descirption` on the `bookmarks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "descirption",
ADD COLUMN     "description" TEXT;
