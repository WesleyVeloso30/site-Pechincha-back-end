/*
  Warnings:

  - You are about to drop the column `date` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "favoriteProducts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startAt" DATETIME,
    "endAt" DATETIME,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "favoriteProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favoriteProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startAt" DATETIME,
    "endAt" DATETIME,
    "regularPrice" INTEGER,
    "promotionalPrice" INTEGER,
    "title" TEXT,
    "subTitle" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    CONSTRAINT "product_id_fkey" FOREIGN KEY ("id") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_product" ("id") SELECT "id" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE TABLE "new_address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT,
    "district" TEXT,
    "city" TEXT,
    "state" TEXT,
    "referencePoint" TEXT,
    "number" INTEGER,
    "zipCode" TEXT,
    CONSTRAINT "address_id_fkey" FOREIGN KEY ("id") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_address" ("city", "district", "id", "street") SELECT "city", "district", "id", "street" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
