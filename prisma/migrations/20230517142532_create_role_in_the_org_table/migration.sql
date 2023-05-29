-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'ORG', 'ADMIN');

-- AlterTable
ALTER TABLE "org" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ORG';
