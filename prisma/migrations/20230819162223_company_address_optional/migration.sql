-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT,
    "district" TEXT,
    "city" TEXT,
    "state" TEXT,
    "referencePoint" TEXT,
    "number" INTEGER,
    "zipCode" TEXT,
    "companyId" INTEGER,
    CONSTRAINT "address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_address" ("city", "district", "id", "number", "referencePoint", "state", "street", "zipCode") SELECT "city", "district", "id", "number", "referencePoint", "state", "street", "zipCode" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
CREATE UNIQUE INDEX "address_companyId_key" ON "address"("companyId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
