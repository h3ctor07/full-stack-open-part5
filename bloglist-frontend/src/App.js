import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import AddBlog from './components/AddBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //retrieve initial blogs from DB on start
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //check if user is in session through localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
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
      setUser(user);
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.message)
    }
    
  }

  //handle logout button
  const handlelogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  }

  // handle create blog button
  const createBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title, author, url
    }

    blogService.createBlog(newBlog)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setTitle('')
        setAuthor('')
        setUrl('')
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
      /> :
      <div>
      <h2>blogs</h2>
      <p>{user.name} logged in<button onClick={handlelogout}>logout</button></p>
      <AddBlog 
        createBlog={createBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    }
    </>
  )
}

export default App