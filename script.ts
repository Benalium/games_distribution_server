import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const addUser = async ({ name, login, password, role }: Prisma.UserCreateInput) => {
  await prisma.user.create({
    data: {
      name,
      login,
      password,
      role
    }
  })
}

const addProduct = async ({ name, description, publisher, genre, platform, image, price }: Prisma.ProductCreateInput) => {
  await prisma.product.create({
    data: {
      name,
      publisher,
      description,
      genre,
      platform,
      image,
      price
    }
  })
}

const deleteProduct = async (id: number) => {
  await prisma.product.delete({
    where: { id }
  })
}

export { addUser, addProduct, deleteProduct }