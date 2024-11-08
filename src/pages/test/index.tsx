// App.tsx or any parent component
import React from 'react';
import AssetBalance from '@/components/AssetBalance';
import Crypto from '@/components/Crypto';
import Forex from '@/components/Forex';

const App: React.FC = () => {

  return (
    <div>
        <Forex  />
    </div>
  );
};

export default App;
