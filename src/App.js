import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';
import Error from './Components/Error';
import LoadingComponent from './Components/LoadingComponent';

function App() {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  //State for the current prices from
  const [currentData, setCurrentData] = useState(null);
  const priceDelta = useRef(0);
  const [coins, setCoins] = useState('BTC,ETH,XRP,BCH,EOS,DOGE,ADA,DOT');

  // hook for getting content from Contentful
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    fetch('http://localhost:4000')
      .then(
        (result) => {
          if (result.ok) {
            return result.json();
          }
          throw Error('Error');
        },
        (error) => {
          throw Error('Network Error');
        }
      )
      .then((jsonData) => {
        setIsLoading(false);
        setContent(jsonData);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  // hook for fetching with time interval
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('Trigger fetch data from api.');
  //     const nomicApiUrl =
  //       process.env.REACT_APP_NOMICS_API_URL +
  //       '?key=' +
  //       process.env.REACT_APP_NOMICS_API_KEY +
  //       '&ids=' +
  //       coins +
  //       '&convert=EUR&per-page=100&page=1';
  //     fetch(nomicApiUrl, {
  //       method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     })
  //       .then(
  //         (result) => {
  //           console.log(result);
  //           if (result.ok) {
  //             return result.json();
  //           }
  //           throw Error('Error');
  //         },
  //         (error) => {
  //           throw Error('Network Error');
  //         }
  //       )
  //       .then((jsonData) => {
  //         if (priceDelta.current !== jsonData[0].price) {
  //           console.log('Update price');
  //           setCurrentData(jsonData);
  //           priceDelta.current = jsonData[0].price;
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Failed to fetch the data.');
  //       });
  //   }, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [coins]);

  // hook for the fetch of the first render
  // useEffect(() => {
  //   const nomicApiUrl =
  //     process.env.REACT_APP_NOMICS_API_URL +
  //     '?key=' +
  //     process.env.REACT_APP_NOMICS_API_KEY +
  //     '&ids=' +
  //     coins +
  //     '&convert=EUR&per-page=100&page=1';
  //   fetch(nomicApiUrl, {
  //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //   })
  //     .then(
  //       (result) => {
  //         console.log(result);
  //         if (result.ok) {
  //           return result.json();
  //         }
  //         throw Error('Error');
  //       },
  //       (error) => {
  //         throw Error('Network Error');
  //       }
  //     )
  //     .then((jsonData) => {
  //       setCurrentData(jsonData);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div>
      <Header values={currentData} content={content} />
      <Switch>
        <Route path="/error" component={Error} />
        <Route path="/">
          {isLoading ? (
            <LoadingComponent />
          ) : isError ? (
            <Redirect to="/error" />
          ) : (
            content && <Main content={content} currentData={currentData} />
          )}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
