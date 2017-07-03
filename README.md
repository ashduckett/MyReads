This project is one that began with a starter project provided by Udacity. In order to run this project you will need to `git clone` it, run `npm install` to
ensure it has all of its dependencies installed, and then you should be able to run it using `npm start`.

My job was to Reactify what was already there and get it reading and writing from and to the BooksAPI. It allows you to categorise your books into 'Read', 'Have Read','Want to Read' or 'None'. If you set a book's category to 'None' it will not appear on any of the relevant shelves on the main page.

## Backend Server

The project uses a backend server provided by Udacity. All methods that perform any HTTP requests are in the `BooksAPI.js` file.

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results. 

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
