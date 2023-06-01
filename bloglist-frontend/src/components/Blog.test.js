import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  beforeEach(() => {
    const blog = {
      'title': 'testTitle',
      'author': 'testAuthor',
      'url': 'testUrl',
      'likes': 5,
      user: [
        {
          username: 'testerUser',
          name: 'tester',
          id: '646d1e89e4aa19faa8eac29b',
        },
      ],
    }

    const user = {
      token: 'token',
      name: 'tester',
      username: 'testerUser',
    }
    container = render(<Blog blog={blog} user={user} />).container
  })

  test('blog only shows title and author by default', async () => {
    screen.getByText('testTitle testAuthor')
    const div = container.querySelector('.extraDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('URL and likes are shown if "show" button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    screen.debug(button)

    await user.click(button)
    const div = container.querySelector('.extraDetails')

    expect(div).not.toHaveStyle('display: none')

  })

})
