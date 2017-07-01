import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class BooksGrid extends React.Component {
  render() {
    return(
      // Should do something with authors, it being an array and all
      // THEN: Tidy up
      // THEN: Get the API working
      <ol className="books-grid">
        {this.props.books.map((book) => (
          <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors[0]}</div> 
              </div>
            </li>
        ))}
      </ol>
    )
  }
}



class SearchArea extends React.Component {
  // The state for this component is just going to need a continually updated query.
  // It's here because each component should manage its own state.
  state = {
    query: ''
  }

  handleChange = (query) => {
    this.setState({query: query})

    // if the query is empty, return this.props.books, otherwise return the filtered ones.
    // You'll need to add the regexp stuff to make the magic happen.
  }

  render() {

    let showingBooks

    if(this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingBooks = this.props.books.filter((book) => match.test(book.title))
    } else {
      showingBooks = this.props.books
    }


    return(
      // Find out about the function call because you want to set the state on the BooksApp component.
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.props.onHideSearch()}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={(event) => this.handleChange(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={showingBooks}/>
        </div>          
      </div>
    )
  }
}

export default SearchArea


/*

  How do I get the search area working?

  When you type, you want to update the display.




*/