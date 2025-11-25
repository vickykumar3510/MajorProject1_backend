const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const { initializeDatabase } = require('./db/db.connect');
const Book = require('./models/books.models');
const Order = require('./models/order.models');

app.use(cors());
app.use(express.json());

initializeDatabase();


async function readAllBooks() {
    try {
        return await Book.find();
    } catch (error) {
        throw error;
    }
}

app.get("/books", async (req, res) => {
    try {
        const books = await readAllBooks();
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: "no books found." });
        }
    } catch (error) {
        res.status(500).json({ error: "failed to fetch books." });
    }
});


async function readBookByGenre(byGenre) {
    try {
        return await Book.find({ bookGenre: byGenre });
    } catch (error) {
        throw error;
    }
}

app.get("/books/bookGenre/:byGenre", async (req, res) => {
    try {
        const books = await readBookByGenre(req.params.byGenre);
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: "no books found." });
        }
    } catch (error) {
        res.status(500).json({ error: "failed to fetch books." });
    }
});


async function readBookByRating(byRating) {
    try {
        return await Book.find({ bookRating: byRating });
    } catch (error) {
        throw error;
    }
}

app.get("/books/bookRating/:byRating", async (req, res) => {
    try {
        const books = await readBookByRating(req.params.byRating);
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: "no books found." });
        }
    } catch (error) {
        res.status(500).json({ error: "failed to fetch books." });
    }
});


async function readBookByPrice(byPrice) {
    try {
        return await Book.find({ bookPrice: byPrice });
    } catch (error) {
        throw error;
    }
}

app.get("/books/bookPrice/:byPrice", async (req, res) => {
    try {
        const books = await readBookByPrice(req.params.byPrice);
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: "no books found." });
        }
    } catch (error) {
        res.status(500).json({ error: "failed to fetch books." });
    }
});


async function readBookByName(byName) {
    try {
        return await Book.find({ bookName: byName });
    } catch (error) {
        throw error;
    }
}

app.get("/books/bookName/:byName", async (req, res) => {
    try {
        const books = await readBookByName(req.params.byName);
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: "no books found." });
        }
    } catch (error) {
        res.status(500).json({ error: "failed to fetch books." });
    }
});



app.post("/place-order", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    res.status(201).json({
      message: "Order saved successfully",
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save order",
      error
    });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();   
    res.json(orders);                    
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

//to reset the order history
app.delete("/reset-orders", async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ message: "All orders deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete orders" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
