import React from 'react'



// This is here so that each book can manage its own state - particularly the
// shelf it should be on.

// Do this Now.
class Book extends React.Component {

    state = {
        bookShelf: 'none'
    }

    componentDidMount() {
        // Here we need to first see if the book is on one of our bookshelves.
        // This can be done via id (but make sure first)
        // Then you can update the bookshelf for this book.

        // How will we know which page we're on? Can we do it in such a way that it doesn't matter?

        // The rendered book could come from the getAll() or the search() method.
        // In the query page, the shelf is none.

        // We could just set it to that of the book, which is fine for the shelves page, however,
        // an extra check: take the book in question, see if the shelf matches that shown in the
        // allBooks array, and if it doesn't use that instead.
    }


    render() {
        
        let book = this.props.book
        console.log('Hello, I am a book');
        console.log('I have an id of ' + book.id)
        console.log('I have an title of ' + book.title)
        console.log('retrieving book using id')
        console.log(this.props.getBookById(book.id))

        // The above function is working. So if it is in the shelf, it won't return null.

        // If it returns null, set it to be the value of book.shelf
        // If it doesn't return null set it to be the value of the book returned from getBookById.


        return(
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event) => this.props.onUpdateBook(event, book, book.shelf)}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors[0] : ''}</div> 
              </div>
            </li>
        )
    }
}


class BooksGrid extends React.Component {



  render() {
    // Is having such a small component bad practice?
    // Have a think
    let books

    if(!(this.props.books && this.props.books.error)) {
        books = this.props.books
    } else {
        books = []
    }
    // You never render a single book on its own. The only reason for having the book as a separate component
    // is so that you can attach a state to it. Is this required?

    return(
      <ol className="books-grid">
        {
            books.map((book) => (
            <Book getBookById={this.props.getBookById} onUpdateBook={this.props.onUpdateBook} book={book ? book : null} key={book.id}/>
        ))
        }
      </ol>
    )
  }
}

export default BooksGrid