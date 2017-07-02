import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchArea from './SearchArea'
import BooksGrid from './BooksGrid'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
// How are we going to handle varying image dimensions?
// Maybe they can come from the api?
// How do I get books I am currently reading? Books I want to read and Books I have read?

// To render this properly we need to go to the API.


class BookShelf extends React.Component {
  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BooksGrid getBookById={this.props.getBookById} onUpdateBook={this.props.onUpdateBook} books={this.props.books ? this.props.books : [] }/>
        </div>
      </div>
    )
  }
}


class BooksApp extends React.Component {
  // Adding this constructor ensures the this binding within hideSearchPage()
  constructor(props) {
    super(props)
    this.hideSearchPage = this.hideSearchPage.bind(this)
    this.updateBook = this.updateBook.bind(this);
    this.getBookById = this.getBookById.bind(this);
  }
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: null,
    allBooks: null
    
  }

  getBookById(id) {
    // urrentlyReading = this.state.allBooks.filter((book) => book.shelf === 'currentlyReading')
    
    
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
              <BookShelf getBookById={this.getBookById} onUpdateBook={this.updateBook} title="Currently Reading" books={ currentlyReading }/>
              <BookShelf getBookById={this.getBookById} onUpdateBook={this.updateBook} title="Want to Read" books={ wantToRead }/>
              <BookShelf getBookById={this.getBookById} onUpdateBook={this.updateBook} title="Read" books={ read }/>
            </div>

            <div className="open-search">

              {/*<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>*/}
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>


        
          
        
      </div>
    )
  }
}

export default BooksApp
