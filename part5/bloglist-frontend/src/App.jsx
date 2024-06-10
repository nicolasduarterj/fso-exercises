import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
const App = () => {

  const [blogs, setBlogs] = useState([])
  const [userLoginData, setUserLoginData] = useState({ uName: '', pass: '' })
  const [user, setUser] = useState(null)
  const [notiMessage, setNotiMessage] = useState({ isError: false, message: null })

  const blogFormRef = useRef()

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      const sortedblogs = blogs.toSorted((blogA, blogB) => blogB.likes - blogA.likes)
      setBlogs(sortedblogs)
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
      const user = await loginService.login(userLoginData)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUserLoginData({ uName: '', pass: '' })
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

  const postBlog = async (blogData) => {
    blogFormRef.current.toggleVisibility()
    const newblog = { ...blogData, likes: 0 }
    console.log(newblog)
    try {
      const response = await blogService.create(newblog)
      console.log(response)
      showSuccess('Blog created successfully')
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

  const likeBlog = async (blog) => {
    try {
      const response = await blogService.like(blog.id)
      console.log(response)
      showSuccess('Blog liked')
    } catch (exception) {
      showError(exception.message)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const response = await blogService.deleteBlog(blog.id)
      console.log(response)
      showSuccess('Blog deleted')
    } catch (exception) {
      showError(exception.message)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notiMessage.message} isError={notiMessage.isError} />

      {user === null &&
        <Togglable buttonLabel='Login'>
          <LoginForm userLoginData={userLoginData} setUserLoginData={setUserLoginData} loginHandler={loginHandler} />
        </Togglable>}

      {user !== null &&
        <button style={{ marginBottom: 5 }} onClick={logout}>Logout</button>}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLike={likeBlog} user={user} onDelete={deleteBlog} />
      )}

      {user !== null &&
        <Togglable buttonLabel='Create blog' ref={blogFormRef}>
          <BlogForm postBlog={postBlog} />
        </Togglable>}

    </div>
  )
}

export default App