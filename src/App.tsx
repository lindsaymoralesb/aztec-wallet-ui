import React, { useEffect, useState } from 'react';
import Wallet from './components/Wallet';
import { initAztec } from './components/AztecWrapper';

const App = () => {

  const [_, setAztecLib] = useState<any>(null);

  useEffect(() => {
    const loadAztec = async () => {
      try {
        const lib = await initAztec();
        setAztecLib(lib);
      } catch (error) {
        console.error('Failed to load Aztec library:', error);
      }
    };

    loadAztec();
  }, []);

  return (
    <div>
      <Wallet />
    </div>
  );
};

export default App;