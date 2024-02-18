const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCount = _.countBy(blogs, 'author')
  
  const authorWithMostBlogs = _.reduce(authorCount, (max, blogs, author) => {
    return max.blogs > blogs ? max : { author: author, blogs: blogs }
  })

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorWithMostLikes = _.chain(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => ({
      author: author,
      likes: _.sumBy(authorBlogs, 'likes')
    }))
    .maxBy('likes')
    .value()
    
  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}