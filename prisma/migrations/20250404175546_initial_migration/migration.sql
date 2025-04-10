-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "dateTime" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ItemOrder" (
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" BIGINT NOT NULL,

    PRIMARY KEY ("productId", "orderId"),
    CONSTRAINT "ItemOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
