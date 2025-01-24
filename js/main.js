// main.js
import { fetchStockData } from './charts.js';

document.getElementById('fetchButton').addEventListener('click', () => {
    const symbol = document.getElementById('stockInput').value;

    if (symbol) {
        fetchStockData(symbol)
            .then((stockPrice) => {
                // Update your page with the stock price prediction
                document.getElementById('predictionOutput').innerText = `Predicted Stock Price: $${stockPrice}`;
            })
            .catch((error) => {
                document.getElementById('predictionOutput').innerText = "Failed to fetch data. Please try again.";
            });
    } else {
        document.getElementById('predictionOutput').innerText = "Please enter a valid stock symbol.";
    }
});
