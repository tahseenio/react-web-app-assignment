import { createContext, useContext, useState } from 'react';
import { toneObject, toneTransport, tonePart } from '../data/instruments.js';

/**
 * Creates the React Context API for use with the Tone.js elements
 */
const ToneContext = createContext({});

/**
 * Wrapper for the ContextAPI
 * @property {JSX.Element} children children of wrapper
 */
const ToneContextProvider = ({ children }) => {
  const [previewing, setPreviewing] = useState(false);

  return (
    <ToneContext.Provider
      value={{
        toneObject,
        toneTransport,
        tonePart,
        previewing,
        setPreviewing,
      }}
    >
      {children}
    </ToneContext.Provider>
  );
};

export default ToneContextProvider;

/**
 * Custom hook to access values of context very easily
 */
export const useToneContext = () => useContext(ToneContext);
