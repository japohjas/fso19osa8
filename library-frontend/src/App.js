import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

const ALL_AUTHORS = gql`
  {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
{
  allBooks { 
    title 
    author
    genres
    published
  }
}
`
const CREATE_BOOK = gql`
  mutation createBook($title: String!, $year: Int!, $author: String!, $genres: [String]) {
    addBook(
      title: $title,
      published: $year,
      author: $author,
      genres: $genres    
    ) {
      title
      author
    }
  }
`
const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $year: Int!) {
    editAuthor(
      name: $name, 
      setBornTo: $year) 
    {
      name
      born
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = (error) => {
    console.log('error', error)
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const authors = useQuery(ALL_AUTHORS)

  const books = useQuery(ALL_BOOKS)

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  return (
    <div>
      <div>
        {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
        }
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors authors={authors} editAuthor={editAuthor}
        show={page === 'authors'}
      />

      <Books books={books}
        show={page === 'books'}
      />

      <NewBook addBook={addBook}
        show={page === 'add'}
      />

    </div>
  )
}

export default App