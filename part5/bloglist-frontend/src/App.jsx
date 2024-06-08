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
  const [blogData, setBlogData] = useState({ title: '', author: '', url: '' })
  const [notiMessage, setNotiMessage] = useState({ isError: false, message: null })

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
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
    const newblog = { ...blogData, likes: 0 }
    try {
      const response = await blogService.create(newblog)
      console.log(response)
      showSuccess("Blog created successfully")
    } catch (exception) {
      showError(exception.message)
    }
  }

  const showError = errormessage => {
    setNotiMessage({ isError: true, message: errormessage })
    setTimeout(() => setNotiMessage({ isError: false, message: null }), 5000)
  }

  const showSuccess = successMessage => {
    setNotiMessage({ isError: false, message: successMessage })
    setTimeout(() => setNotiMessage({ isError: false, message: null }), 5000)
  }

  return (
    <div>
      <Notification message={notiMessage.message} isError={notiMessage.isError} />
      {user === null && LoginForm({ setuName, setPass, loginHandler, currentuName: uName, currentpass: pass })}
      {user !== null && <button onClick={logout}>Logout</button>}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {user !== null && BlogForm({ blogData, setBlogData, postBlog })}
    </div>
  )
}

export default App