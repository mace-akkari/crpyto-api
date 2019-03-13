import './style.css';

async function fetchAPI(coin) {
  const response = await fetch(getExchangeRateURL() + coin);

  if (!response.ok) {
    throw new Error('Bad Response');
  }

  try {
    const exchangeData = await response.json();
    const rates = getRates(exchangeData);
    const currencyRates = getRatesByCurrency(rates, ['EUR', 'USD', 'GBP']);
    createTable(currencyRates);
  } catch (e) {
    console.error(e, 'OOOOPS something went wrong!!');
  }
  return;
}
// =========================================================
//Table Data
// =========================================================
function createTable(rates) {

  const originalDiv = document.querySelector("#currencyTable");
  const newDiv = document.createElement("DIV");
  newDiv.id = "currencyTable";

  if (originalDiv !== null) {
    document.body.removeChild(originalDiv);
  }

  const tableData = document.createElement("TABLE");

  for (let i = 0; i < rates.length; i++) {
    let trow = tableData.insertRow();
    let cell1 = trow.insertCell(0) // calling with an argument = index 0
    let cell2 = trow.insertCell(1)
    cell1.textContent = rates[i].curr
    cell2.textContent = rates[i].price
  }

  tableData.style.width = '100px';
  tableData.style.border = '1px solid black';

  newDiv.appendChild(tableData);
  document.body.appendChild(newDiv);
}

//===============================================================
//New currency buttons
//===============================================================

let currencyDiv = document.createElement("DIV");
currencyDiv.id = "currencyDiv";
document.body.appendChild(currencyDiv);

function changeButton(target, buttonClass) {
  const activeClass = "active";
  document.querySelectorAll(`.${buttonClass}`).forEach((el) => {
    el.classList.remove(activeClass);
  });
  target.classList.add(activeClass);
}

function createCurrencyButton(id, label, code) {
  const button = document.createElement("BUTTON");
  const buttonClass = "buttonClass";

  button.id = id;
  button.textContent = label;
  button.classList.add(buttonClass);
  
  const eventHandler = async (e) => {
    const currentTarget = e.currentTarget;
    await fetchAPI(code);
    changeButton(currentTarget, buttonClass);
  };

  button.addEventListener("click", eventHandler);
  currencyDiv.appendChild(button)
};

createCurrencyButton("btcButton", "BitCoin", "BTC");
createCurrencyButton("ethButton", "Ethereum", "ETH");
createCurrencyButton("ltcButton", "LiteCoin", "LTC");

//===============================================================


function getRatesByCurrency(exchangeData, currencies) {
  return currencies.map((curr) => ({
    curr, price: exchangeData[curr]
  }));
}

function getRates(exchangeData) {
  return exchangeData.data.rates;
}

function getExchangeRateURL() {
  const baseUrl = 'https://api.coinbase.com/v2/exchange-rates?currency='
  return baseUrl
}
// INIT 
fetchAPI('BTC');