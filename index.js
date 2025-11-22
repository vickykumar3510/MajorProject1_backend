const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const {initializeDatabase} = require('./db/db.connect')
const Book = require('./models/books.models')
app.use(cors())
app.use(express.json())
initializeDatabase()

async function readAllBooks(){
    try{
        const allBooks = await Book.find()
        return allBooks
    }catch(error){
        throw error
    }
}

app.get("/books", async(req, res) => {
    try{
        const books = await readAllBooks()
        if(books.length !==0){
            res.json(books)
        }else{
            res.status(404).json({error: "no books found."})
        }

    }catch(error){
        res.status(500).json({error: "failed to fetch books."})
    }
})

 async function readBookByGenre(byGenre){
    try{
        const bookByGenre = await Book.find({bookGenre: byGenre})
        return bookByGenre
    }catch(error){
        throw error
    }
 }

 app.get("/books/bookGenre/:byGenre", async(req, res) => {
    try{
        const books = await readBookByGenre(req.params.byGenre)
        if(books.length !== 0){
            res.json(books)
        }else{
            res.send(404).json({error: "no books found."})
        }

    }catch(error){
        res.status(500).json({error: "failed to fetch books."})
    }
 })


 async function readBookByRating(byRating){
    try{
        const bookByRating = await Book.find({bookRating: byRating})
        return bookByRating
    }catch(error){
        throw error
    }
 }

 app.get("/books/bookRating/:byRating", async(req, res) => {
    try{
        const books = await readBookByRating(req.params.byRating)
        if(books.length !== 0){
            res.json(books)
        }else{
            res.send(404).json({error: "no books found."})
        }

    }catch(error){
        res.status(500).json({error: "failed to fetch books."})
    }
 })


  async function readBookByPrice(byPrice){
    try{
        const bookByPrice = await Book.find({bookPrice: byPrice})
        return bookByPrice
    }catch(error){
        throw error
    }
 }

 app.get("/books/bookPrice/:byPrice", async(req, res) => {
    try{
        const books = await readBookByPrice(req.params.byPrice)
        if(books.length !== 0){
            res.json(books)
        }else{
            res.send(404).json({error: "no books found."})
        }

    }catch(error){
        res.status(500).json({error: "failed to fetch books."})
    }
 })

 async function readBookByName(byName){
    try{
        const bookByName = await Book.find({bookName: byName})
        return bookByName
    }catch(error){
        throw error
    }
 }

  app.get("/books/bookName/:byName", async(req, res) => {
    try{
        const books = await readBookByName(req.params.byName)
        if(books.length !== 0){
            res.json(books)
        }else{
            res.status(404).json({error: "no books found."})
        }

    }catch(error){
        res.status(500).json({error: "failed to fetch books."})
    }
 })



const PORT = 3000

module.exports = app;



