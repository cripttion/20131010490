import React, { useState } from "react";

const Numbergame = () => {
  const [numbers, setNumbers] = useState([]);

  const fetchNumbers = async () => {
    const urls = [
      "http://20.244.56.144/numbers/primes",
      "http://20.244.56.144/numbers/fibo",
      "http://20.244.56.144/numbers/odd",
      "http://20.244.56.144/numbers/rand",
    ];

    try {
      const responses = await Promise.all(
        urls.map(async (url) => {
          try {
            const response = await fetch(url, { timeout: 500 });
            if (!response.ok) {
              throw new Error(`Network response was not ok for URL: ${url}`);
            }
            const data = await response.json();
            return data.numbers;
          } catch (error) {
            console.error("Error fetching from", url, error);
            return [];
          }
        })
      );

      const allNumbers = responses.flat();

      const uniqueNumbers = [...new Set(allNumbers)];
      const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

      setNumbers(sortedNumbers);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };

  return (
    <div className="main" >

      <button style={{ width: "150px", height: '40px', borderRadius: '10px', border: 'none', cursor: 'pointer' }} onClick={fetchNumbers}>Show Numbers</button>
      <div>
        <h2>Results</h2>
        <pre>
          {JSON.stringify({ Numbers: numbers }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Numbergame;
