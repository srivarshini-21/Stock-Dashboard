const API_KEY = '7c964e844bfb4a62ac82cb098ecc6018';  // Your real API key
const API_URL = `https://api.twelvedata.com/time_series?symbol={symbol}&interval=1min&apikey=${API_KEY}`;

const ctx = document.getElementById('stockChart').getContext('2d');
const stockChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Stock Price',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `Price: $${tooltipItem.raw.toFixed(2)}`,
                }
            }
        }
    }
});

// Fetch stock data
export async function fetchStockData(symbol) {
    const apiKey = '7c964e844bfb4a62ac82cb098ecc6018';  // Replace with your real API key
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&apikey=${apiKey}`;

    const proxyUrl = 'https://api.allorigins.win/get?url=';  // Updated CORS proxy URL

    try {
        const response = await fetch(proxyUrl + encodeURIComponent(url));
        const data = await response.json();

        if (data.contents) {
            const stockData = JSON.parse(data.contents);
            const stockPrice = stockData.values[0].close;
            console.log(`Stock Price for ${symbol}: $${stockPrice}`);
            
            // Update chart and prediction
            updateChart(stockData.values.map(item => item.datetime), stockData.values.map(item => item.close));
            updatePrediction(symbol, stockPrice);

            return stockPrice;  // Return stock price so it can be used in main.js
        } else {
            throw new Error("Invalid data received");
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw new Error("Error fetching stock data");
    }
}

function updateChart(labels, data) {
    stockChart.data.labels = labels;
    stockChart.data.datasets[0].data = data;
    stockChart.update();
}

function updatePrediction(symbol, latestPrice) {
    const prediction = latestPrice * (1 + Math.random() * 0.1 - 0.05); // Simulating prediction
    document.getElementById('predictionOutput').textContent =
        `Predicted price for ${symbol.toUpperCase()}: $${prediction.toFixed(2)}`;
}
