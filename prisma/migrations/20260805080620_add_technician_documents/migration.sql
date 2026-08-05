/*
  Warnings:

  - Made the column `graduationCertificate` on table `Technician` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idCardImage` on table `Technician` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Technician" ALTER COLUMN "graduationCertificate" SET NOT NULL,
ALTER COLUMN "idCardImage" SET NOT NULL;
