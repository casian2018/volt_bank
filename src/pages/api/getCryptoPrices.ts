// /pages/api/getCryptoPrices.ts

interface CryptoPrices {
  [key: string]: number;
}

interface ErrorResponse {
  message: string;
}

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: CryptoPrices | ErrorResponse): void; new(): any; }; }; }) {
  try {
    // Fetch prices from CoinGecko API using the native fetch
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,ripple&vs_currencies=usd');
    const data = await response.json();

    // Structure the response data
    const cryptoPrices: CryptoPrices = {
      BTCUSD: data.bitcoin.usd,
      ETHUSD: data.ethereum.usd,
      LTCUSD: data.litecoin.usd,
      XRPUSD: data.ripple.usd,
    };

    res.status(200).json(cryptoPrices);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    res.status(500).json({ message: 'Error fetching crypto prices' });
  }
}
