import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Product Model', () => {
  it('should create a product', async () => {
    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        description: 'This is a test product',
        genre: 'Action',
        platform: 'PC',
        publisher: 'Test Publisher',
        image: 'test-image-url',
        price: 29.99,
      },
    });

    expect(product).toHaveProperty('id');
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(29.99);
  });

  it('should find a product by ID', async () => {
    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        description: 'This is a test product',
        genre: 'Action',
        platform: 'PC',
        publisher: 'Test Publisher',
        image: 'test-image-url',
        price: 29.99,
      },
    });

    const foundProduct = await prisma.product.findUnique({
      where: { id: product.id },
    });

    expect(foundProduct).toBeTruthy();
    expect(foundProduct?.name).toBe('Test Product');
  });

  it('should update a product', async () => {
    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        description: 'This is a test product',
        genre: 'Action',
        platform: 'PC',
        publisher: 'Test Publisher',
        image: 'test-image-url',
        price: 29.99,
      },
    });

    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: {
        price: 49.99,
      },
    });

    expect(updatedProduct.price).toBe(49.99);
  });

  it('should delete a product', async () => {
    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        description: 'This is a test product',
        genre: 'Action',
        platform: 'PC',
        publisher: 'Test Publisher',
        image: 'test-image-url',
        price: 29.99,
      },
    });

    await prisma.product.delete({
      where: { id: product.id },
    });

    const deletedProduct = await prisma.product.findUnique({
      where: { id: product.id },
    });

    expect(deletedProduct).toBeNull();
  });
});