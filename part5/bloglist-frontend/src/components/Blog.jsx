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
    <div className='blogStyle'>
      {blog.title}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <ul style={showWhenVisible}>
        <li>
          URL: <a href={blog.url}>{blog.url}</a>
        </li>
        <li>
          Likes: {blog.likes} <button onClick={likeBlog}>Like</button>
        </li>
        <li>Author: {blog.author}</li>
        <li>Added by: {blog.user.name}</li>
      </ul>
      <div style={showWhenVisible}>
        {user.username === blog.user.username &&
          <button onClick={removeBlog}>Remove</button>
        }
      </div>
    </div>
  )
}

export default Blog
