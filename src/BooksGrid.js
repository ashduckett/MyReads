import React from 'react'



// This is here so that each book can manage its own state - particularly the
// shelf it should be on.
class Book extends React.Component {

    render() {
        
        let book = this.props.book

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
            <Book onUpdateBook={this.props.onUpdateBook} book={book ? book : null} key={book.id}/>
        ))
        }
      </ol>
    )
  }
}

export default BooksGrid