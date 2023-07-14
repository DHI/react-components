import React from "react";

type ErrorContextType = {
  errors: Record<string, unknown>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
};

const ErrorContext = React.createContext<ErrorContextType | null>(null);

export const useErrorContext = () => {
  const context = React.useContext(ErrorContext);
  if (!context) throw new Error('useErrorContext must be used within an ErrorProvider');
  return context;
};

export const ErrorProvider: React.FC = ({ children }) => {
  const [errors, setErrors] = React.useState<Record<string, unknown>>({});

  return (
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorContext.Provider>
  );
};
