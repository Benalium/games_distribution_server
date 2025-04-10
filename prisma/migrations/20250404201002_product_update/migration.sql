/*
  Warnings:

  - You are about to drop the column `amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - Added the required column `number` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "dateTime" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("dateTime", "id", "paymentMethod", "userId") SELECT "dateTime", "id", "paymentMethod", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "genre" TEXT,
    "platform" TEXT,
    "publisher" TEXT,
    "image" TEXT,
    "price" REAL NOT NULL
);
INSERT INTO "new_Product" ("description", "genre", "id", "image", "name", "platform", "price", "publisher") SELECT "description", "genre", "id", "image", "name", "platform", "price", "publisher" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
