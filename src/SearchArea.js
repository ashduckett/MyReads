import React from 'react'

class SearchArea extends React.Component {
  render() {
    return(
      // Find out about the function call because you want to set the state on the BooksApp component.
      <div className="search-books">
        <div className="search-books-bar">
          
          <a className="close-search" onClick={() => this.props.onHideSearch()}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchArea