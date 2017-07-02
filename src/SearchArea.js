import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './BooksAPI'

/*
  On initially rendering the search area, show nothing.

  Each book needs to have its own state so the select tool has an appropriate value.

*/


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
          <a className="close-search" onClick={() => this.props.onHideSearch()}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={(event) => this.handleChange(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid onUpdateBook={this.props.onUpdateBook} books={this.state.filteredBooks ? this.state.filteredBooks : []}/>
        </div>          
      </div>
    )
  }
}

export default SearchArea