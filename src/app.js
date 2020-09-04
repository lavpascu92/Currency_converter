const currencyOneEl = document.getElementById('currency-one');
const currencyTwoEl = document.getElementById('currency-two');
const amountOneEl = document.getElementById('amount-one');
const amountTwoEl = document.getElementById('amount-two');

const swapBtn = document.getElementById('swap-btn');
const exchangeRateEl = document.getElementById('exchange-rate');
const dateEl = document.getElementById('date');

const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const bodyEl = document.getElementById('body');


// Event listeners
currencyOneEl.addEventListener('change', getExchangeRate);

currencyTwoEl.addEventListener('change', getExchangeRate);

amountOneEl.addEventListener('input', getExchangeRate);

amountTwoEl.addEventListener('input', getExchangeRate);
// Swap the currencies between themselves
swapBtn.addEventListener('click', () => {
    const temp = currencyOneEl.value;
    currencyOneEl.value = currencyTwoEl.value;
    currencyTwoEl.value = temp;
    getExchangeRate();
});
getExchangeRate();
// Change from dark theme to light
themeBtn.addEventListener('click', () => {
    themeBtn.classList.toggle('light-theme-icon');
    themeIcon.classList.toggle('fa-sun');
    themeIcon.classList.toggle('fa-moon');
    bodyEl.classList.toggle('light-theme-bg');
})

// Functions
async function getExchangeRate() {
    // Get the values of options selcted
    const currencyOne_value = currencyOneEl.value;
    const currencyTwo_value = currencyTwoEl.value;
    // Fetch data from API
    let result = await fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne_value}`);
    let data = await result.json();
    // Get the current date and display on page
    const current_date = data.date;
    dateEl.innerHTML = `Date of exchange: ${current_date}`;
    // Get the exchange rate
    const exchangeRate = data.rates[currencyTwo_value];
    // Display the exchange rate in div
    exchangeRateEl.innerText = `1 ${currencyOne_value} = ${exchangeRate.toFixed(3)} ${currencyTwo_value}`;
    // Calculate excange rate
    amountTwoEl.value = (amountOneEl.value * exchangeRate).toFixed(3);
}