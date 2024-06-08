const BlogForm = ({ newBlogTitle, setNewBlogTitle, newBlogAuthor, setNewBlogAuthor, newBlogUrl, setNewBlogUrl, postBlog }) => (
  <form onSubmit={postBlog}>
    Title:<input type="text" value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} />
    Author:<input type="text" value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} />
    url:<input type="text" value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} />
    <button type="submit">Post blog</button>
  </form>
)

export default BlogForm