import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User Model', () => {
  it('should create a user', async () => {
    const user = await prisma.user.create({
      data: {
        login: 'testuser',
        name: 'Test User',
        password: 'password123',
        role: 1,
      },
    });

    expect(user).toHaveProperty('id');
    expect(user.login).toBe('testuser');
  });

  it('should find a user by login', async () => {
    const user = await prisma.user.create({
      data: {
        login: 'testuser',
        name: 'Test User',
        password: 'password123',
        role: 1,
      },
    });

    const foundUser = await prisma.user.findUnique({
      where: { login: user.login },
    });

    expect(foundUser).toBeTruthy();
    expect(foundUser?.login).toBe('testuser');
  });

  it('should update a user\'s password', async () => {
    const user = await prisma.user.create({
      data: {
        login: 'testuser',
        name: 'Test User',
        password: 'password123',
        role: 1,
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: 'newpassword123',
      },
    });

    expect(updatedUser.password).toBe('newpassword123');
  });

  it('should delete a user', async () => {
    const user = await prisma.user.create({
      data: {
        login: 'testuser',
        name: 'Test User',
        password: 'password123',
        role: 1,
      },
    });

    await prisma.user.delete({
      where: { id: user.id },
    });

    const deletedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(deletedUser).toBeNull();
  });
});
