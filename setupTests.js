import '@testing-library/jest-dom';

// Check if `window` and `ResizeObserver` are available
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  const { ResizeObserver } = window;

  beforeEach(() => {
    // Mock ResizeObserver for tests that depend on it
    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    // Restore ResizeObserver after each test
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });
}
