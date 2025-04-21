const express = require('express')
let books = require('./booksdb.js')
let isValid = require('./auth_users.js').isValid
let users = require('./auth_users.js').users
const public_users = express.Router()

public_users.post('/register', (req, res) => {
  //Write your code here
  return res.status(300).json({ message: 'Yet to be implemented' })
})

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4))
  // return res.status(300).json({ message: 'Yet to be implemented' })
})

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  const book = Object.values(books).find(book => book.isbn === isbn)
  if (book) res.send(book)
  else res.status(404).json({ message: 'Book not found' })
})

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const author = req.params.author
  const booksByAuthor = Object.values(books).filter(
    book => book.author === author
  )
  if (booksByAuthor.length > 0) res.send(booksByAuthor)
  else res.status(404).json({ message: 'No books found' })
  // return res.status(300).json({ message: 'Yet to be implemented' })
})

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title
  if (title) {
    const booksByTitle = Object.values(books).filter(
      book => book.title === title
    )
    if (booksByTitle.length > 0) res.send(booksByTitle)
    else res.status(404).json({ message: 'No books found' })
  } else {
    return res.status(404).json({ message: 'Book not found' })
  }
})

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn
  if (isbn) {
    const book = Object.values(books).find(book => book.isbn === isbn)

    if (Object.keys(book.reviews).length === 0) {
      res.json({ message: 'No reviews for this book yet.' })
    } else {
      res.json(book.reviews)
    }
  } else {
    res.status(404).json({ message: 'No book found' })
  }
})

module.exports.general = public_users
