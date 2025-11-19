const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookAuthor: String,
    bookName: String,
    bookImage: String,
    bookPrice: Number,
    bookDescription: String,
    bookRating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    bookGenre: [
        {
            type: String,
            enum: ["Fiction", "Fantasy", "Science Fiction", "Non-Fiction", "Biography",  "History", "Mystery", "Thriller", "Romance", "Children", "Others"]
        }
    ],
},
{
        timestamps: true
})

const Book = mongoose.model('book', bookSchema)
module.exports= Book