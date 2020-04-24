import { useContext, Context } from 'react';

const getName = <T extends object>(obj: T) => Object.keys(obj)[0];

// Helper function for safeContexts
const useSafeContext = <T extends unknown>(_context: Context<T>) => {
  // Make sure we have the context
  const context = useContext(_context);

  if (context === undefined) {
    throw new Error(`${getName(_context)} must be wrapped in a Provider`);
  }

  return context;
};

export { useSafeContext };
