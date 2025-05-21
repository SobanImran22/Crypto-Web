import React, { useEffect, useState } from 'react';


const Gif = () => {
  const [data, setData] = useState(
    Array(10).fill({ address: '', amount: '', link: '#' })
  );

  useEffect(() => {
    const blockchain = new WebSocket('wss://ws.blockchain.info/inv');

    blockchain.onopen = () => {
      blockchain.send(JSON.stringify({ op: 'unconfirmed_sub' }));
    };

    blockchain.onmessage = (message) => {
      const response = JSON.parse(message.data);
      let amount = 0;

      if (response.op === 'utx') {
        for (let i = 0; i < response.x.out.length; i++) {
          amount += response.x.out[i].value;
        }

        amount = amount / 100000000;

        const newEntry = {
          address: response.x.out[1]?.addr || 'Unknown',
          amount: amount.toFixed(8),
          link: `https://blockchain.info/tx/${response.x.hash}`,
        };

        setData(prev => [newEntry, ...prev.slice(0, 9)]);
      }
    };

    return () => blockchain.close();
  }, []);

  return (
    <div className="content">
      {data.map((item, i) => (
        <div key={i}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <div className="address">{item.address}</div>
          </a>
          <div className="btc">{item.amount} BTC</div>
          {i < data.length - 1 && <hr />}
        </div>
      ))}
      <div style={{ position: 'relative', textAlign: 'right', top: '-15px', fontSize: 'x-small' }}>
        <a href="https://coingi.com/" style={{ color: '#4ddaed' }}>bitcoin exchange</a>
      </div>
    </div>
  );
};

export default Gif;
