/*
  Warnings:

  - You are about to alter the column `quantity` on the `ItemOrder` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to drop the column `number` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Order` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemOrder" (
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("productId", "orderId"),
    CONSTRAINT "ItemOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemOrder" ("orderId", "productId", "quantity") SELECT "orderId", "productId", "quantity" FROM "ItemOrder";
DROP TABLE "ItemOrder";
ALTER TABLE "new_ItemOrder" RENAME TO "ItemOrder";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "dateTime" TEXT NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("dateTime", "id", "userId") SELECT "dateTime", "id", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "login", "name", "password", "role") SELECT "id", "login", "name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
