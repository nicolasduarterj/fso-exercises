const listHelper = require('../utils/list_helper')
const _ = require('lodash')

test('Dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
const oneBlogList = [{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}]
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('when list only has one blog, return that blog\'s likes', () => {
    const result = listHelper.totalLikes(oneBlogList)
    expect(result).toBe(5)
  })
  test('when list has multiple blogs, return the actual sum of their likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
  test('when list has no blogs, return zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when list has one blog, return that blog', () => {
    const result = listHelper.favoriteBlog(oneBlogList)
    expect(result).toEqual(oneBlogList[0])
  })
  test('when list has many blogs, return the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('when list has one blog, return that blog\'s author', () => {
    const result = listHelper.mostBlogs(oneBlogList)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })
  test('when list has many blogs, return the most prolific author', () => {
    const result = listHelper.mostBlogs(blogs)
    listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('when list has one blog, return that blog\'s author', () => {
    const result = listHelper.mostLikes(oneBlogList)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })
  test('when list has many blogs, return the most prolific author', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
  test('when the list contains two author with the same number of likes, return at least one of them', () => {
    const newblog = {
      _id: '5a422bc61b54a676234d12ab',
      title: 'No north star',
      author: 'Nicolas Duarte',
      url: 'http://www.nonorthstar.net',
      likes: 17,
      __v: 0
    }
    const blogswith2winners = _.concat(blogs, newblog)
    const result = listHelper.mostLikes(blogswith2winners)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
    // já que ele não atualiza o índice se for igual, prevalece o que veio primeiro
  })
})
