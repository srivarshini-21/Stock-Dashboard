const API_KEY = '4BQ95UN68KSK4WG2';
const API_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey=' + API_KEY;

export async function fetchStockData(symbol) {
    const url = API_URL.replace('{symbol}', symbol);
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data['Time Series (Daily)']) {
            throw new Error('Invalid data received.');
        }
        const dailyData = data['Time Series (Daily)'];
        const dates = Object.keys(dailyData).reverse();
        const prices = dates.map(date => parseFloat(dailyData[date]['4. close']));

        // Simulated sector data for heatmap
        const sectors = {
            'Technology': Math.random() * 100,
            'Healthcare': Math.random() * 100,
            'Finance': Math.random() * 100,
            'Energy': Math.random() * 100,
            'Consumer Goods': Math.random() * 100
        };

        return { dates, prices, sectors };
    } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
    }
}
