import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class SearchArea extends React.Component {
  // The state for this component is just going to need a continually updated query.
  // It's here because each component should manage its own state.
  state = {
    query: '',
    filteredBooks: null
  }

  handleChange = (query) => {
    this.setState({query: query})

    if(query.trim() !== '') {
      BooksAPI.search(query, 20).then(books => this.setState({
        filteredBooks: books
      }))
    } else {
      this.setState({
        filteredBooks: []
      })
    }
  }

  render() {
    return(
      // Find out about the function call because you want to set the state on the BooksApp component.
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={(event) => this.handleChange(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid getBookById={this.props.getBookById} onUpdateBook={this.props.onUpdateBook} books={this.state.filteredBooks ? this.state.filteredBooks : []}/>
        </div>          
      </div>
    )
  }
}

export default SearchArea