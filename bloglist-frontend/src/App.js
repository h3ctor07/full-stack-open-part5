import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      setUser(JSON.parse(loggedUserJSON))
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
    window.localStorage.clear();
    setUser(null);
  }

  //login form
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username 
        <input 
        type='text'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password 
        <input
        type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button>login</button>
    </form>
  )

  return (
    <>
    { user === null?
      loginForm() :
      <div>
      <h2>blogs</h2>
      <p>{user.name} logged in<button onClick={handlelogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    }
    </>
  )
}

export default App