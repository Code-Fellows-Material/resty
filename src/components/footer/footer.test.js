import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Footer from './index.js';

describe('testing the Header component', () => {
  it('Should render RESTy on initial load', () => {
  let text = "2022"

    render(<Footer />);
    let heading = screen.getByText(text);
    expect(heading).toBeInTheDocument();
  });
});
