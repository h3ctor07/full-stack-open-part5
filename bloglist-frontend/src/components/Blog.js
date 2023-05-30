import { useState } from "react"
import blogService from "../services/blogs"

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(true)
  const [blog, setBlog] = useState(props.blog)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    blogService.updateBlog(blog.id, {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1,
    })

    blogService.getBlogById(blog.id)
      .then(data => setBlog(data))
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