import React from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  console.log('props', props.books)
  if (!props.books.data) {
    return null
  }

  const result = props.books.data.allBooks
  console.log('Books result', result)

  if (!result) {
    return null
  }

  const books = result

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books