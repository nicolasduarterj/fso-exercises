const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)
  return blogs.length === 0
    ? 0
    : likes.reduce((acc, item) => acc + item)
}

module.exports = {
  dummy,
  totalLikes
}
