import { useState } from "react"

const BlogForm = ({ postBlog }) => {
  const [blogData, setBlogData] = useState({ title: '', author: '', url: '' })
  const submitBlog = (event) => {
    event.preventDefault()
    postBlog(blogData)
    setBlogData({ title: '', author: '', url: '' })
  }
  return (
    <form onSubmit={submitBlog}>
      Title:<input type="text" value={blogData.title} onChange={({ target }) => setBlogData({ ...blogData, title: target.value })} />
      <br />
      Author:<input type="text" value={blogData.author} onChange={({ target }) => setBlogData({ ...blogData, author: target.value })} />
      <br />
      url:<input type="text" value={blogData.url} onChange={({ target }) => setBlogData({ ...blogData, url: target.value })} />
      <br />
      <button type="submit">Post blog</button>
    </form>
  )
}

export default BlogForm