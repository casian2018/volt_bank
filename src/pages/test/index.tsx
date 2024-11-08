// App.tsx or any parent component
import React from 'react';
import AssetBalance from '@/components/AssetBalance';

const App: React.FC = () => {
  const cryptoBalances = {
    bitcoin: 0.5,
    ethereum: 2.0,
    litecoin: 10.0,
    ripple: 1000.0
  };

  const forexBalances = {
    EUR: 500.0,
    GBP: 300.0
  };

  const stockBalances = {
    AAPL: 11.0,
    TSLA: 5.0
  };

  return (
    <div>
      <h1>Asset Balance</h1>
      <AssetBalance cryptoBalances={cryptoBalances} forexBalances={forexBalances} stockBalances={stockBalances} />
    </div>
  );
};

export default App;
