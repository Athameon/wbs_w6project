import React from 'react';
import Data from '../Mock.json';

const CryptoInfo = () => {
  const values = Data[2];
  return (
    <aside>
      <h2>Name:</h2>
      <p>{values.name}</p>
      <h2>Currency</h2>
      <p>{values.currency}</p>
      <h2>Price (€):</h2>
      <p>{values.price}</p>
      <h2>First Trade:</h2>
      <p>{values.first_trade}</p>
      <h2>Alltime high date:</h2>
      <p>{values.high_timestamp}</p>
      <h2>Alltime high value:</h2>
      <p>{values.high}</p>
      <hr />
      <h2>Exchange history:</h2>
      <h3>1 Day</h3>
      <p>{values["1d"].price_change}</p>
      <h3>7 Days</h3>
      <p>{values["7d"].price_change}</p>
      <h3>30 Days</h3>
      <p>{values["30d"].price_change}</p>
      <h3>356 Days</h3>
      <p>{values["365d"].price_change}</p>
    </aside>
  )
}

export default CryptoInfo;