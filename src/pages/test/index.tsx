// App.tsx or any parent component
import React from 'react';
import Crypto from '@/components/Crypto';
import Forex from '@/components/Forex';

const App: React.FC = () => {

  return (
    <div>
        <Crypto />
    </div>
  );
};

export default App;
