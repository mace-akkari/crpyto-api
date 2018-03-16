import './style.css';
import Icon from './favicon.jpg';

// https://developers.coinbase.com/api/v2#exchange-rates

fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
  .then((response)=> {
    if(response.ok) {
      return response.json();
    }
  })
  .then((data)=>{
    console.log(data)
  });