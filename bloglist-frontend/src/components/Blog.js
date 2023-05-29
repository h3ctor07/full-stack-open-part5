import { useState } from "react"

const Blog = ({blog}) => {
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

  const simpleView = () => (
    <>
      <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button></p>
    </>  
  )

  const detailedView = () => (
    <>
      <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button>like</button></p>
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