/*
  Warnings:

  - You are about to alter the column `promotionalPrice` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `regularPrice` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startAt" DATETIME,
    "endAt" DATETIME,
    "regularPrice" REAL,
    "promotionalPrice" REAL,
    "title" TEXT,
    "subTitle" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_product" ("companyId", "description", "endAt", "id", "imageUrl", "promotionalPrice", "regularPrice", "startAt", "subTitle", "title") SELECT "companyId", "description", "endAt", "id", "imageUrl", "promotionalPrice", "regularPrice", "startAt", "subTitle", "title" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
