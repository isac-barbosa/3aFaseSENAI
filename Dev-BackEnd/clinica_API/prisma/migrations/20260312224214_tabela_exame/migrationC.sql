/*
  Warnings:

  - Added the required column `tipo_exame` to the `exame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exame" ADD COLUMN     "tipo_exame" TEXT NOT NULL;
