import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useLocalStorageValue from '.';

const TestComponent: React.FC<{
  storageKey: string;
  initialValue?: string;
}> = ({ storageKey, initialValue }) => {
  const [value, setValue] = useLocalStorageValue<string>(
    storageKey,
    initialValue,
  );

  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => setValue('newValue')}>Set New Value</button>
    </div>
  );
};

describe('useLocalStorageValue', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should initialize with null if localStorage has no value and no initialValue is provided', () => {
    render(<TestComponent storageKey="testKey" />);
    const valueElement = screen.getByTestId('value');
    expect(valueElement.textContent).toBe('');
  });

  it('should initialize with initialValue if provided, and set it in localStorage', () => {
    render(<TestComponent storageKey="testKey" initialValue="initialValue" />);
    const valueElement = screen.getByTestId('value');
    expect(valueElement.textContent).toBe('initialValue');
    expect(localStorage.getItem('testKey')).toBe(
      JSON.stringify('initialValue'),
    );
  });

  it('should initialize with the value from localStorage if no initialValue is provided', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));

    render(<TestComponent storageKey="testKey" />);
    const valueElement = screen.getByTestId('value');
    expect(valueElement.textContent).toBe('storedValue');
  });

  it('should initialize with initialValue, overriding any value in localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));
    render(
      <TestComponent storageKey="testKey" initialValue="newInitialValue" />,
    );
    const valueElement = screen.getByTestId('value');
    expect(valueElement.textContent).toBe('newInitialValue');
    expect(localStorage.getItem('testKey')).toBe(
      JSON.stringify('newInitialValue'),
    );
  });

  it('should update the value in state and localStorage', () => {
    render(<TestComponent storageKey="testKey" />);

    const button = screen.getByText('Set New Value');
    fireEvent.click(button);

    const valueElement = screen.getByTestId('value');
    expect(valueElement.textContent).toBe('newValue');
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });

  it('should update state when localStorage changes externally', () => {
    render(<TestComponent storageKey="testKey" />);

    // Simulate a change in localStorage
    localStorage.setItem('testKey', JSON.stringify('updatedValue'));
    fireEvent(window, new StorageEvent('storage', { key: 'testKey' }));

    const valueElement = screen.getByTestId('value');
    expect(valueElement.textContent).toBe('updatedValue');
  });
});
