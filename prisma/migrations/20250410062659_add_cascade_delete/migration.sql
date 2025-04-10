-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemOrder" (
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("productId", "orderId"),
    CONSTRAINT "ItemOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ItemOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemOrder" ("orderId", "productId", "quantity") SELECT "orderId", "productId", "quantity" FROM "ItemOrder";
DROP TABLE "ItemOrder";
ALTER TABLE "new_ItemOrder" RENAME TO "ItemOrder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
