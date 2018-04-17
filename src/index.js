import './style.css';
import Icon from './favicon.jpg';

function fetchAPI(coin) {
fetch(getExchangeRateURL()+coin)
  .then((response)=> {
    if(response.ok) {
      return response.json();
    } else {
      throw new Error('Bad Response')
    }
  })
  .then(getRates)
  .then((data) => {
    return getRatesByCurrency(data, ['EUR', 'USD', 'GBP'])
  })
  .then((rates) => {
    console.log(rates)
    return rates
    
  })
  .then(createTable)

  .catch((error)=> {
    console.error(error,'OOOOPS something went wrong!!')
  })
}
  // =========================================================
  //Table Data
  // =========================================================
  function createTable(rates) {

    const originalDiv = document.querySelector("#currencyTable");
    const newDiv = document.createElement("DIV");
    newDiv.id = "currencyTable";

    if(originalDiv !== null) {
      document.body.removeChild(originalDiv);
    }

    const tableData = document.createElement("TABLE" );
    
      for(let i = 0; i < rates.length; i++){
         let trow = tableData.insertRow();
         let cell1 = trow.insertCell(0) // calling with an argument = index 0
         let cell2 = trow.insertCell(1)
         cell1.textContent = rates[i].curr
         cell2.textContent = rates[i].price
      }

    tableData.style.width  = '100px';
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

function createCurrencyButton(id, label, code) {
  const button = document.createElement("BUTTON");
  button.id = id; 
  button.textContent = label; 
  button.classList.add("buttonClass", "active")
  button.addEventListener("click", () => {
    fetchAPI(code)
  });
  currencyDiv.appendChild(button)
};

createCurrencyButton("btcButton", "BitCoin", "BTC");
createCurrencyButton("ltcButton", "LiteCoin", "LTC");
createCurrencyButton("ethButton", "Ethereum", "ETH");

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