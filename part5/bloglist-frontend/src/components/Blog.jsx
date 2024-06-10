import { useState } from "react"

const Blog = ({ blog, onLike }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeClick = (event) => {
    event.preventDefault()
    onLike(blog)
  }

  return (
    <div style={blogStyle}>
      Title: {blog.title}
      <button style={{ marginLeft: 5 }} onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Less' : 'More'}</button>
      <br />
      Author: {blog.author}
      {showDetails &&
        <>
          <br />
          Url: {blog.url}
          <br />
          Likes: {blog.likes}
          <button style={{ marginLeft: 5 }} onClick={likeClick}>Like</button>
          <br />
          Posted by: {blog.user.name}
        </>}
    </div>
  )
}

export default Blog