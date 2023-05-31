import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  const addBlogRef = useRef()

  //retrieve initial blogs from DB on start
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a,b) => b.likes - a.likes))
    })
  }, [])

  //check if user is in session through localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //handle login form and save to localStorage
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.message)

      setNotification({
        message: 'wrong username or password',
        error: true,
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  }

  //handle logout button
  const handlelogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // handle create blog button
  const createBlog = (object) => {
    addBlogRef.current.toggleVisibility()
    blogService.createBlog(object)
      .then(blog => {
        // console.log(blog);
        // console.log(blogs);
        setBlogs(blogs.concat({ ...blog, user: [user] }))
        setNotification({
          message: `a new blog ${object.title} by ${object.author || user.name} added`,
          error: false,
        })
      })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  //update likes
  const updateLike = (id, object) => {
    blogService.updateBlog(id, object).then(data => {
      console.log('updated', data)
      setBlogs(blogs.map(blog => blog.id === id? data : blog))
    })
  }

  //delete a blog
  const deleteBlog = (id) => {
    blogService.deleteBlog(id).then(() => {
      setBlogs(blogs.filter(blog => blog.id !== id))
    })
  }

  return (
    <>
      { user === null?
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          notification={notification}
        /> :
        <div>
          <h2>blogs</h2>
          {notification && <Notification
            notification={notification}
          />}
          <p>{user.name} logged in<button onClick={handlelogout}>logout</button></p>
          <Togglable buttonLabel="new note" ref={addBlogRef}>
            <AddBlog createBlog={createBlog}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user} updateLike={updateLike}/>
          )}
        </div>
      }
    </>
  )
}

export default App