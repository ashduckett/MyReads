import React from 'react'
import Book from './Book'
import sortBy from 'sort-by'

class BookShelf extends React.Component {
  render() {
    let books = this.props.books ? this.props.books : [];
    books.sort(sortBy('title'))

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book) => (
                <Book getBookById={this.props.getBookById} onUpdateBook={this.props.onUpdateBook} book={book ? book : null} key={book.id}/>
              ))
            }
         </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf