import './style.css';
import Icon from './favicon.jpg';

// https://developers.coinbase.com/api/v2#exchange-rates

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
  })
  .catch((error)=> {
    console.error(error)
  })

  function getRatesByCurrency(exchangeData, currencies) {
    return currencies.map((code) => ({
      code,
      value: exchangeData[code]
    }));
  }
  
  function getRates(exchangeData) {
    return exchangeData.data.rates;
  }

  function getExchangeRateURL(currency) {
    return `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`    
  }