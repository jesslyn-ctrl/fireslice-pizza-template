import { useError } from '@/contexts/ErrorContext';

const GlobalErrorDisplay = () => {
  const { errorMessage } = useError();

  if (!errorMessage) return null;

  return (
    <div
      className={`fixed top-4 right-4 bg-red-400 text-white p-4 rounded-md shadow-md transition-all duration-500 transform ${
        errorMessage ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      } z-50`}
    >
      <p>{errorMessage}</p>
    </div>
  );
};

export default GlobalErrorDisplay;
