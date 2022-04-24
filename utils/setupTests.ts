import '@testing-library/jest-dom';

const defaultMatchMedia = {
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  media: null,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
};

const mockIntersectionObserver = jest.fn().mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});

window.IntersectionObserver = mockIntersectionObserver;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(() => (defaultMatchMedia)),
});
