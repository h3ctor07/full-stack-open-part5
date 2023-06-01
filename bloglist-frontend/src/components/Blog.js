import { useState } from 'react'

const Blog = ({ blog, deleteBlog, user, updateLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [simpleView, setSimpleView] = useState(true)

  const toggleView = () => {
    setSimpleView(!simpleView)
  }

  const hideWhenSimpleView = { display: simpleView ? 'none': '' }

  const handleLike = () => {
    updateLike(blog.id, {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1,
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blof ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={toggleView}>{simpleView? 'show': 'hide'}</button></p>
      <div style={hideWhenSimpleView} className='extraDetails'>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.user[0].username}</p>
        {blog.user[0].username === user.username && <button onClick={handleDelete}>remove</button>}
      </div>
    </div>
  )
}

export default Blog