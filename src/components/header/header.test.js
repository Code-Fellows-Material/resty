import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from './index.js';

describe('testing the Header component', () => {
  it('Should render RESTy on initial load', () => {
   let title = "RESTy"

    render(<Header />);
    let heading = screen.getByText(title);
    expect(heading).toBeInTheDocument();
  });
});
