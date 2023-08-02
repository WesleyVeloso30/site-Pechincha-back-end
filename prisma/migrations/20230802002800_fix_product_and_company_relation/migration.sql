/*
  Warnings:

  - Added the required column `companyId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
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
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_product" ("description", "endAt", "id", "imageUrl", "promotionalPrice", "regularPrice", "startAt", "subTitle", "title") SELECT "description", "endAt", "id", "imageUrl", "promotionalPrice", "regularPrice", "startAt", "subTitle", "title" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
