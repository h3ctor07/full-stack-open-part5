import { useState } from 'react'
import Proptypes from 'prop-types'

const AddBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
					title
          <input
            type="text"
            id='title-input'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
					author
          <input
            type="text"
            id='author-input'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
					url
          <input
            type="text"
            id='url-input'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

AddBlog.propTypes = {
  createBlog: Proptypes.func.isRequired,
}

export default AddBlog