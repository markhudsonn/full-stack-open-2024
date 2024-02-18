import React, { useState } from 'react'

const Blog = ( { blog, updateBlog, deleteBlog, user } ) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showWhenVisible = {
    display: visible ? '' : 'none'
  }

  const likeBlog = async () => {
    await updateBlog({
      ...blog,
      likes: blog.likes + 1
    })
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog)
    }
  }

  return (
    <div className='blog'>
      <span className='blog-title'>{blog.title}</span> by <span className='blog-author'>{blog.author}</span>
      <button onClick={toggleVisibility} className='view-button'>
        {visible ? 'hide' : 'view'}
      </button>
      <ul style={showWhenVisible}>
        <li>
          URL: <a href={blog.url} className='blog-url'>{blog.url}</a>
        </li>
        <li>
          Likes: <span id='likes-counter'>{blog.likes}</span> <button onClick={likeBlog} id='like-button'>Like</button>
        </li>
        <li>Added by: {blog.user.name}</li>
      </ul>
      <div style={showWhenVisible}>
        {user &&
          user.username === blog.user.username &&
          <button onClick={removeBlog}>Remove</button>
        }
      </div>
    </div>
  )
}

export default Blog
