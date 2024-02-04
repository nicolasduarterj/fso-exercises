const _ = require('lodash')
const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)
  return blogs.length === 0
    ? 0
    : likes.reduce((acc, item) => acc + item)
}

const favoriteBlog = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const indexOfMax = likes.reduce((indexMax, atual, indexAtual, arr) => atual > arr[indexMax] ? indexAtual : indexMax, 0)
  return blogs[indexOfMax]
}

const mostBlogs = blogs => {
  const result = _.countBy(blogs, 'author')
  const names = _.keys(result)
  const numbers = _.values(result)
  const indexOfMax = numbers.reduce((indexMax, atual, indexAtual, arr) => atual > arr[indexMax] ? indexAtual : indexMax, 0)
  const returnObj = {
    author: names[indexOfMax],
    blogs: numbers[indexOfMax]
  }
  return returnObj
}

const mostLikes = blogs => {
  const perAuthor = _.groupBy(blogs, 'author')
  /* ∀ array de objetos presente como valor no perAuthor -> reduce que soma os likes de cada
   objeto na array -> resultado do reduce substitui o valor original */
  const numberPA = _.mapValues(perAuthor, (arr) => arr.reduce((sum, atual) => sum + atual.likes, 0))
  const names = _.keys(numberPA)
  const numbers = _.values(numberPA)
  const indexOfMax = numbers.reduce((indexMax, atual, indexAtual, arr) => atual > arr[indexMax] ? indexAtual : indexMax, 0)
  const returnObj = {
    author: names[indexOfMax],
    likes: numbers[indexOfMax]
  }
  return returnObj
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
