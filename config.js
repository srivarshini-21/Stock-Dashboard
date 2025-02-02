require('dotenv').config();

const ALPHA_API_KEY = process.env.REACT_APP_ALPHA_API_KEY;
const TWELVE_API_KEY = process.env.REACT_APP_TWELVE_API_KEY;

module.exports = { ALPHA_API_KEY, TWELVE_API_KEY };
console.log("Alpha API Key:", ALPHA_API_KEY);
console.log("Twelve API Key:", TWELVE_API_KEY);
