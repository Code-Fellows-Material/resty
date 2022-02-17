import { rest } from 'msw'
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './app.js';

const toDoResponse = rest.get('https://jsonplaceholder.typicode.com/todos/1', (req, res, ctx) => {
  return res(ctx.json({
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  }))
})

const server = setupServer(toDoResponse);

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

//==================================================




test('Checks for API request', async () => {
  render(<App />)

  // grab inputs
  let urlForm = screen.getByTestId('test-form');
  let submit = screen.getByTestId('button');
  let postButton = screen.getByTestId('get-form');
  fireEvent.click(postButton)


  // add values to input elements
  fireEvent.change(urlForm, { target: { 
    url: {value: 'https://jsonplaceholder.typicode.com/todos/1'},
  } })
  
  // click on submit
  fireEvent.click(submit);

  const data = await screen.findByText('userId');

  expect(data).toBeVisible();
})
