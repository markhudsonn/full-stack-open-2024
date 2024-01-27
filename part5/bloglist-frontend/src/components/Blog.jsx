import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showWhenVisible = {
    display: visible ? '' : 'none'
  };

  return (
    <div className='blogStyle'>
      {blog.title}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <ul style={showWhenVisible}>
        <li>URL: {blog.url}</li>
        <li>
          Likes: {blog.likes} <button>like</button>
        </li>
        <li>Author: {blog.author}</li>
        <li>Added by: {blog.user.name}</li>
      </ul>
    </div>
  );
};

export default Blog;
