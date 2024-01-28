import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe("<Blog />", () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "https://www.test.com/",
    likes: 0,
    user: {
      username: "username",
      name: "name",
    }
  }

  let component

  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })

  test("displays title and author, but not url or likes by default", () => {
    expect(component.container.querySelector(".blog-title")).toHaveTextContent("Title")
    expect(component.container.querySelector(".blog-author")).toHaveTextContent("Author")
    expect(component.container.querySelector(".blog-url")).not.toBeVisible()
    expect(component.container.querySelector(".blog-likes")).not.toBeVisible()
  })

  test("displays url and likes when button is clicked", () => {
    const button = component.container.querySelector(".view-button")
    fireEvent.click(button)

    expect(component.container.querySelector(".blog-url")).toBeVisible()
    expect(component.container.querySelector(".blog-likes")).toBeVisible()
  })
})