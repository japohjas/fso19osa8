import React, { useState } from 'react'

const Authors = (props) => {
  const [author, satAuthor] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (!props.authors.data.allAuthors) {
    return null
  }

  const authors = props.authors.data.allAuthors
  console.log('authors', authors)

  const handleChange = (event) => {
    console.log('name:', event.target.value)
    satAuthor(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let name = author
    if (author === '') {
      name = authors[0].name
    }
    const year = parseInt(born)
    console.log('author:', name, 'birthday:', born)
    await props.editAuthor({
      variables: { name, year }
    })

    //setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <label>
          <h2>Set birthyear</h2>
          <select value={author} onChange={handleChange}>
            {authors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
        </label>
        <div>
          born:
          <input
            type="text"
            value={born}
            name="born"
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors