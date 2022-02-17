import { render, screen, fireEvent } from '@testing-library/react';
import Form from './index.js';

describe('Testing form component', () => {

  it('Form should execute a callback', () => {
    let callback = jest.fn();

    const {queryByTestId} = render( <Form handleApiCall={callback} />);

    // grab inputs
    let urlForm = queryByTestId('test-form');
    let submit = screen.getByTestId('button');
    let postButton = screen.getByTestId('post-form');
    fireEvent.click(postButton)


    // add values to input elements
    fireEvent.change(urlForm, { target: { 
      url: {value: 'url'},
      body: {value: 'target'} 
    } })
    
    // click on submit
    fireEvent.click(submit);

    expect(callback).toHaveBeenCalledWith({
      method: "post",
      url: "url",
      data:"target",
    });
  });
});
