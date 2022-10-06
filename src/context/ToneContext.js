import { createContext, useContext, useState } from 'react';
import { toneObject, toneTransport, tonePart } from '../data/instruments.js';

const ToneContext = createContext({});

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

export const useToneContext = () => useContext(ToneContext);
