/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `org` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "org_email_key" ON "org"("email");
