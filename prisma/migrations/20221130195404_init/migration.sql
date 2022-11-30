-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "price" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "product_id_fkey" FOREIGN KEY ("id") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    CONSTRAINT "address_id_fkey" FOREIGN KEY ("id") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
