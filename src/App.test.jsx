import { render, screen } from '@testing-library/react';
import App from './App';

// Mock IntersectionObserver
beforeAll(() => {
  window.IntersectionObserver = class IntersectionObserver {
    observe() {
      return null;
    }
    disconnect() {
      return null;
    }
    unobserve() {
      return null;
    }
  };
});

describe('App Smoke Test', () => {
  test('renders the main heading', () => {
    render(<App />);
    const heading = screen.getAllByText(/MILES/i)[0];
    expect(heading).toBeInTheDocument();
  });

  test('renders the scroll button', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /scroll/i });
    expect(button).toBeInTheDocument();
  });
});
