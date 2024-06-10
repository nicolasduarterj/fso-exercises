import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, onLike, user, onDelete }) => {
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

  const deleteClicked = (event) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      event.preventDefault()
      onDelete(blog)
    }
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
          {user?.uName === blog.user.uName &&
            <>
              <br />
              <button onClick={deleteClicked}>Delete</button>
            </>}
        </>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Blog