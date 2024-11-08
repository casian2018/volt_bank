
import React, { useState, useEffect } from 'react';

interface AssetBalanceProps {
    cryptoBalances?: { [key: string]: number };
    forexBalances?: { [key: string]: number };
    stockBalances?: { [key: string]: number };
}

const AssetBalance: React.FC<AssetBalanceProps> = ({ cryptoBalances = {}, forexBalances = {}, stockBalances = {} }) => {
  const [usdBalances, setUsdBalances] = useState<{ [key: string]: number }>({});
  const [totalUsd, setTotalUsd] = useState<number>(0);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      const updatedUsdBalances: { [key: string]: number } = {};
      let total = 0;

      for (const [crypto, balance] of Object.entries(cryptoBalances)) {
        try {
          const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
          const data = await response.json();
          const price = data[crypto]?.usd || 0;
          const usdValue = balance * price;
          updatedUsdBalances[crypto] = usdValue;
          total += usdValue;
        } catch (error) {
          console.error(`Error fetching price for ${crypto}:`, error);
        }
      }

      return { updatedUsdBalances, total };
    };

    const fetchForexPrices = async () => {
      const updatedUsdBalances: { [key: string]: number } = {};
      let total = 0;

      for (const [forex, balance] of Object.entries(forexBalances)) {
        try {
          const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
          const data = await response.json();
          const price = data.rates[forex.toUpperCase()] || 0;
          const usdValue = balance / price;
          updatedUsdBalances[forex] = usdValue;
          total += usdValue;
        } catch (error) {
          console.error(`Error fetching price for ${forex}:`, error);
        }
      }

      return { updatedUsdBalances, total };
    };

    const fetchStockPrices = async () => {
      const updatedUsdBalances: { [key: string]: number } = {};
      let total = 0;

      for (const [stock, balance] of Object.entries(stockBalances)) {
        try {
          const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=csn70hpr01qqapai5o6gcsn70hpr01qqapai5o70`);
          const data = await response.json();
          const price = data.c || 0;
          const usdValue = balance * price;
          updatedUsdBalances[stock] = usdValue;
          total += usdValue;
        } catch (error) {
          console.error(`Error fetching price for ${stock}:`, error);
        }
      }

      return { updatedUsdBalances, total };
    };

    const fetchAllPrices = async () => {
      const cryptoResults = await fetchCryptoPrices();
      const forexResults = await fetchForexPrices();
      const stockResults = await fetchStockPrices();

      const combinedBalances = {
        ...cryptoResults.updatedUsdBalances,
        ...forexResults.updatedUsdBalances,
        ...stockResults.updatedUsdBalances,
      };

      const combinedTotal = cryptoResults.total + forexResults.total + stockResults.total;

      setUsdBalances(combinedBalances);
      setTotalUsd(combinedTotal);
    };

    fetchAllPrices();
  }, [cryptoBalances, forexBalances, stockBalances]);

  return (
    <div>
      {Object.entries(usdBalances).map(([asset, usdValue]) => (
        <div key={asset}>
          {cryptoBalances[asset] || forexBalances[asset] || stockBalances[asset]} {asset.toUpperCase()} is ${usdValue.toFixed(2)} USD
        </div>
      ))}
      <div>Total Balance in USD: ${totalUsd.toFixed(2)}</div>
    </div>
  );
};

export default AssetBalance;
