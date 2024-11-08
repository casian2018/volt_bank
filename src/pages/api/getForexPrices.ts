// /pages/api/getForexPrices.ts

interface ForexPrices {
    [key: string]: number;
}

interface ErrorResponse {
    message: string;
}

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: ForexPrices | ErrorResponse): void; new(): any; }; }; }) {
    try {
        // Fetch prices from a Forex API using the native fetch
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();

        // Structure the response data
        const forexPrices: ForexPrices = {
            EURUSD: data.rates.EUR,
            GBPUSD: data.rates.GBP,
            JPYUSD: data.rates.JPY,
            AUDUSD: data.rates.AUD,
        };

        res.status(200).json(forexPrices);
    } catch (error) {
        console.error('Error fetching forex prices:', error);
        res.status(500).json({ message: 'Error fetching forex prices' });
    }
}