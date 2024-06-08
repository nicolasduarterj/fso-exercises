import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './index.css'
const App = () => {

  const [blogs, setBlogs] = useState([])
  const [uName, setuName] = useState('')
  const [pass, setPass] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notiMessage, setNotiMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginHandler = async (event) => {
    try {
      event.preventDefault()
      const user = await loginService.login({ uName, pass })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setuName('')
      setPass('')
      console.log(user)
      showSuccess(`Logged in as ${user.name}`)
    } catch (exception) {
      showError(exception.message)
    }
  }

  const logout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const postBlog = async (event) => {
    event.preventDefault()
    const newblog = { title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl, likes: 0 }
    try {
      const response = await blogService.create(newblog)
      console.log(response)
      showSuccess("Blog created successfully")
    } catch (exception) {
      showError(exception.message)
    }
  }

  const showError = errormessage => {
    setIsError(true)
    setNotiMessage(errormessage)
    setTimeout(() => setNotiMessage(null), 5000)
  }

  const showSuccess = successMessage => {
    setIsError(false)
    setNotiMessage(successMessage)
    setTimeout(() => setNotiMessage(null), 5000)
  }

  return (
    <div>
      <Notification message={notiMessage} isError={isError} />
      {user === null && LoginForm({ setuName, setPass, loginHandler, currentuName: uName, currentpass: pass })}
      {user !== null && <button onClick={logout}>Logout</button>}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {user !== null && BlogForm({ newBlogTitle, setNewBlogTitle, newBlogAuthor, setNewBlogAuthor, newBlogUrl, setNewBlogUrl, postBlog })}
    </div>
  )
}

export default App