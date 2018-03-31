import './style.css';
import Icon from './favicon.jpg';

fetch(getExchangeRateURL('BTC'))
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

  //Table Data
  // =========================================================
  function createTable(rates) {
    const div1 = document.createElement("DIV");
    div1.id = "currencyTable";

    const tableData = document.createElement("TABLE" );
      for(let i = 0; i < rates.length; i++){
         let trow = tableData.insertRow();
         let cell1 = trow.insertCell(0) // calling with an argument = index 0
         let cell2 = trow.insertCell(1)
         cell1.textContent = rates[i].curr
         cell2.textContent = rates[i].price
      }

    tableData.style.width  = '100px' ;
    tableData.style.border = '1px solid black';

    div1.appendChild(tableData)
    document.body.appendChild(div1);
  }

//===============================================================

//New currency button
//===============================================================

function createButton() {
const div2 = document.createElement("DIV");
div2.id = "currencyButton";

const currencyRefresh = document.createElement("INPUT");
currencyRefresh.setAttribute("value", " Enter Currency Code");
currencyRefresh.setAttribute("onfocus", "this.value=''");
currencyRefresh.addEventListener ("click", () => {
  //do somethin here
  alert("wow");
});
div2.appendChild(currencyRefresh)


document.body.appendChild(div2);

}
createButton()
//===============================================================

//Refresh button
//===============================================================

function pageRefresh() {
  const div3 = document.createElement("DIV");
  div3.id = "refreshButton";
  
  const refreshButton = document.createElement("BUTTON");
  refreshButton.setAttribute("value", "Refresh Page");
  refreshButton.addEventListener ("click", () => {
    onclick = window.location.href=window.location.href
    alert("You have refreshed for the latest exchange rate!");
  });
  div3.appendChild(refreshButton)
  
  
  document.body.appendChild(div3);
  
  }
  pageRefresh()


//===============================================================


  function getRatesByCurrency(exchangeData, currencies) {
    return currencies.map((curr) => ({
      curr, price: exchangeData[curr]
    }));
  }
  
  function getRates(exchangeData) {
    return exchangeData.data.rates;
  }

  function getExchangeRateURL(currency) {
    return `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`    
  }