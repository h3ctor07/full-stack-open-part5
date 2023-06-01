import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import AddBlog from "./AddBlog";

test('form calls event handler for blog creation with the right details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<AddBlog createBlog={createBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const button = screen.getByText('create')

  await user.type(titleInput, 'titleTest')
  await user.type(authorInput, 'authorTest')
  await user.type(urlInput, 'urlTest')
  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('titleTest')
  expect(createBlog.mock.calls[0][0].author).toBe('authorTest')
  expect(createBlog.mock.calls[0][0].url).toBe('urlTest')
})