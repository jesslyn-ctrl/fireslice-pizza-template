import React, { createContext, useContext, useState } from "react";

// Create a context for managing error messages
interface ErrorContextType {
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

interface ErrorProviderProps {
    children: React.ReactNode;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Custom hook to use the error context
export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

// Provider to wrap around your app to provide the error context
export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSetErrorMessage = (message: string | null) => {
    setErrorMessage(message);

    if (message) {
      setTimeout(() => {
        setErrorMessage(null); // Clear the error after 5 seconds
      }, 3000);
    }
  };

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage: handleSetErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};
