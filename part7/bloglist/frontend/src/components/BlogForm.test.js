import React from "react";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("BlogForm calls the event handler it received as props with the right details when a new blog is created", async () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const titleInput = component.container.querySelector("#title");
  const authorInput = component.container.querySelector("#author");
  const urlInput = component.container.querySelector("#url");
  const submitButton = component.container.querySelector("#create-blog-button");

  await userEvent.type(titleInput, "Title");
  await userEvent.type(authorInput, "Author");
  await userEvent.type(urlInput, "https://www.test.com/");
  await userEvent.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Title",
    author: "Author",
    url: "https://www.test.com/",
  });
});
