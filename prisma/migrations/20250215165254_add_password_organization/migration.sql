/*
  Warnings:

  - Added the required column `password_hash` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whatsapp` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postalCode` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `organizations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "password_hash" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "whatsapp" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "postalCode" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL;
