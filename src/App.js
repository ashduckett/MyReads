import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchArea from './SearchArea'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    this.hideSearchPage = this.hideSearchPage.bind(this)
    this.updateBook = this.updateBook.bind(this);
    this.getBookById = this.getBookById.bind(this);
  }
  
  state = {
    currentlyReading: null,
    allBooks: null
  }

  getBookById(id) {
    let books

    if(this.state.allBooks) {
      books = this.state.allBooks.filter((book) => book.id === id)
      if (books.length > 0) {
        return books[0]
      } else {
        return null
      }
    }
  }

  componentDidMount() {
    // Obtain the shelved books
    BooksAPI.getAll().then(books => this.setState({
      allBooks: books
    }))
  }

  // Cause a re-render and hide the search page
  hideSearchPage() {
    this.setState({
      showSearchPage: false
    })
  }

  updateBook(event, book) {

    let self = this
    BooksAPI.update(book, event.target.value).then(function() {

       // Let's try changing the shelf value on all books:
      BooksAPI.getAll().then(books => self.setState({
        allBooks: books
      }))
    })
  }

  render() {
      let currentlyReading
      let wantToRead
      let read
      
      if(this.state.allBooks !== null) {
        currentlyReading = this.state.allBooks.filter((book) => book.shelf === 'currentlyReading')
        wantToRead = this.state.allBooks.filter((book) => book.shelf === 'wantToRead')
        read = this.state.allBooks.filter((book) => book.shelf === 'read')
      }
    return (

      <div className="app">
        <Route path="/search" render={() => (
          <SearchArea getBookById={this.getBookById} onUpdateBook={this.updateBook} onHideSearch={this.hideSearchPage}/>
        )}/>
        
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf getBookById={this.getBookById} onUpdateBook={this.updateBook} title='Currently Reading' books={ currentlyReading }/>
              <BookShelf getBookById={this.getBookById} onUpdateBook={this.updateBook} title='Want to Read' books={ wantToRead }/>
              <BookShelf getBookById={this.getBookById} onUpdateBook={this.updateBook} title='Read' books={ read }/>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
