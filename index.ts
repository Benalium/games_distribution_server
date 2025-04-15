import cors from 'cors'
import express from 'express'
import { PrismaClient } from '@prisma/client';
import { deleteProduct, addProduct } from './script';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;
const prisma = new PrismaClient()

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
})

app.get('/', (req, res) => {
  res.send('Hello!');
});

// Login //

app.post("/login", async (req, res) => {
  console.log("Received:", req.body);
  console.log("DB URL:", process.env.DATABASE_URL)
  const { login, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { login },
  });
  if (!user || user.password !== password) {
    res.status(401).json({
      status: 'error',
      message: 'Incorrect data.'
    });
    return
  }
  console.log('Respond:', user)
  res.json({
    user: user,
    redirect: `http://localhost:5173/products`
  });
});

app.post("/register", async (req, res) => {
  const user = req.body
  await prisma.user.create({
    data: {
      ...user
    }
  })
  res.status(200).json();
})

// Add product //

app.post("/products", async (req, res) => {
  const product = req.body;
  addProduct(product)
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  res.json({ success: true, received: req.body });
});

// Delete products //

app.delete('/products/:id', async (req, res) => {
  console.log("Received:", req.body);
  const id = parseInt(req.params.id);
  await deleteProduct(id)
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  res.json({ success: true, received: req.body });
})

// Patch //

app.patch("/products/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  await prisma.product.update({
    where: {
      id: id
    },
    data: req.body
  });
  res.status(200).json();
})

// Get products //

app.get("/products", async (req, res) => {
  const list = req.query.ids
  if (list) {
    var ids = req.query.ids.split(',').map(id => isNaN(id) ? id : Number(id));
  }
  let products = await prisma.product.findMany();
  if (list) {
    products = await prisma.product.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const product = prisma.product.findUnique({
    where: {
      id: Number(req.params.id)
    }
  })
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
})

app.post("/receipts", async (req, res) => {
  const order = req.body
  try {
    await prisma.order.create({
      data: {
        dateTime: new Date().toLocaleString(),
        userId: order.userId,
        items: {
          create: order.items
        }
      }
    })
  } catch (error) {
    console.error("Failed to create order:", error)
    res.status(500).json()
  }
  res.status(200).json()
})

app.get("/receipts", async (req, res) => {
  let orders
  try {
    orders = await prisma.order.findMany({
      include: {
        user: true,
        items: true
      }
    }
    )
    Object.freeze(orders)
  } catch {
    res.status(500)
  }
  res.status(200).json(orders)
})