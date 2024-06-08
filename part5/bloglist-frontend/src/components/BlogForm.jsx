const BlogForm = ({ blogData, setBlogData, postBlog }) => (
  <form onSubmit={postBlog}>
    Title:<input type="text" value={blogData.title} onChange={({ target }) => setBlogData({ ...blogData, title: target.value })} />
    Author:<input type="text" value={blogData.author} onChange={({ target }) => setBlogData({ ...blogData, author: target.value })} />
    url:<input type="text" value={blogData.url} onChange={({ target }) => setBlogData({ ...blogData, url: target.value })} />
    <button type="submit">Post blog</button>
  </form>
)

export default BlogForm