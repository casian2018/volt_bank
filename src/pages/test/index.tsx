// App.tsx or any parent component
import React from 'react';
import AssetBalance from '@/components/AssetBalance';
import Crypto from '@/components/Crypto';

const App: React.FC = () => {

  return (
    <div>
      <Crypto/>
    </div>
  );
};

export default App;
