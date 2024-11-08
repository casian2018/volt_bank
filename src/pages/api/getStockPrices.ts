// /pages/api/getStockPrices.ts

interface StockPrices {
    [key: string]: number;
}

interface ErrorResponse {
    message: string;
}

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: StockPrices | ErrorResponse): void; new(): any; }; }; }) {
    try {
        // Fetch prices from a stock price API (example: Alpha Vantage)
        const response = await fetch('https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=IBM,AAPL,GOOGL,MSFT&apikey=YOUR_API_KEY');
        const data = await response.json();

        // Structure the response data
        const stockPrices: StockPrices = {
            IBM: parseFloat(data['Stock Quotes'][0]['2. price']),
            AAPL: parseFloat(data['Stock Quotes'][1]['2. price']),
            GOOGL: parseFloat(data['Stock Quotes'][2]['2. price']),
            MSFT: parseFloat(data['Stock Quotes'][3]['2. price']),
        };

        res.status(200).json(stockPrices);
    } catch (error) {
        console.error('Error fetching stock prices:', error);
        res.status(500).json({ message: 'Error fetching stock prices' });
    }
}