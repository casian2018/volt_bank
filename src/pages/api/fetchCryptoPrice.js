// pages/api/fetchCryptoPrice.js
export default async function handler(req, res) {
    const { symbol } = req.query;
    
    if (!symbol) {
      return res.status(400).json({ error: 'Symbol is required' });
    }
  
    try {
      const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
      if (!response.ok) {
        throw new Error(`Error fetching data from Binance: ${response.statusText}`);
      }
      
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching price:', error);
      res.status(500).json({ error: 'Failed to fetch price' });
    }https://api.binance.com/api/v3/ticker/price?symbol=${symbo
  }
  ${currency.toLowerCase()}