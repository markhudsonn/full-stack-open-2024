const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

const blogs = helper.initialBlogs()

describe('dummy', () => {
  test('dummy returns one', () => {
    expect(listHelper.dummy(blogs)).toBe(1)
  })
})

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(helper.listWithOneBlog)).toBe(5)

  })
})

describe('favourite blog', () => {
  test('favourite blog', () => {
    expect(listHelper.favouriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe('author with most blogs', () => {
  test('author with most blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('author with most likes', () => {
  test('author with most likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  }) 
})


  
