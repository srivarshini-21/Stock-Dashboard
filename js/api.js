const ALPHA_API_KEY = '4BQ95UN68KSK4WG2';  // Your real API key
const proxyUrl = 'https://api.allorigins.win/get?url=';  // Updated CORS proxy URL

async function fetchStockData(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_API_KEY}`;

    try {
        const response = await fetch(proxyUrl + encodeURIComponent(url));
        const data = await response.json();
        if (data.contents) {
            const dailyData = JSON.parse(data.contents)['Time Series (Daily)'];
            if (!dailyData) {
                throw new Error('Invalid data received.');
            }
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
        } else {
            throw new Error("Invalid data received");
        }
    } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
    }
}
