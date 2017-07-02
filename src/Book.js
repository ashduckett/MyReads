import React from 'react'

class Book extends React.Component {

    state = {
        bookShelf: 'none'
    }

    handleShelfChange(event, book) {
        // Make sure the main book respository is updated
        this.props.onUpdateBook(event, book)

        // Update this component's shelf state
        this.setState({
            bookShelf: event.target.value
        })
    }

    componentDidMount() {
        let book = this.props.book
        let shelf
        let bookOnShelf = this.props.getBookById(book.id);

        // If the book is on the shelf, use that value, otherwise it should have a none value
        if(bookOnShelf !== null) {
            shelf = bookOnShelf.shelf
        } else {
            shelf = 'none'
        }
        
        this.setState({
            bookShelf: shelf
        })
    }


    render() {
        
        let book = this.props.book

        return(
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.bookShelf} onChange={(event) => this.handleShelfChange(event, book)}>
                        <option value="noValue" disabled>Move to...</option>
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

export default Book