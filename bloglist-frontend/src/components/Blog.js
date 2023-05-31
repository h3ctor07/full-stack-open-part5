import { useState } from 'react'

const Blog = ({ blog, deleteBlog, user, updateLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(true)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

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

  const simpleView = () => (
    <>
      <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button></p>
    </>
  )

  const detailedView = () => (
    <>
      <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
      <p>{blog.user[0].username}</p>
      {blog.user[0].username === user.username && <button onClick={handleDelete}>remove</button>}
    </>
  )

  return (
    <div style={blogStyle}>
      {visible ?
        simpleView() :
        detailedView()}
    </div>
  )
}

export default Blog