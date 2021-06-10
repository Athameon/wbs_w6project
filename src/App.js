import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';
import Error from './Components/Error';
import LoadingComponent from './Components/LoadingComponent'

import Client from './client';

function App() {
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    //State for the current prices from 
    const [values, setCurrentData] = useState(null);
    const priceDelta = useRef(0)
    const prevData = useRef(null);
    // setCurrentData(Data);
  
    console.log("hello");
    console.log(prevData);
    console.log(values);

    // hook for getting content from Contentful
    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        
        Client.getEntries()
        .then(result => {
        console.log(result);
        setIsLoading(false);
        setContent(result);
        }, (error) => {
        throw Error("Network Error." + error)
        })
        .catch(error => {
        console.log("Error occured");
        console.error(error);
        setIsLoading(false);
        setIsError(true);
        })
    }, [])

    // hook for fetching with time interval
    useEffect(() => {
        const interval = setInterval(() => {
        console.log("Trigger fetch data from api.");
        fetch("https://api.nomics.com/v1/currencies/ticker?key=e976e656db4b58f3a781f96a9918f6f3916e6849&ids=BTC,ETH,XRP,BCH,EOS,DOGE&convert=EUR&per-page=100&page=1", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        })
        .then(result => {
            console.log(result);
            if(result.ok) {
                return result.json();
            }
            throw Error("Error");
        }, (error => {
            throw Error("Network Error");
        }))
        .then(jsonData => {
            if (priceDelta.current !== jsonData[0].price) {
                console.log("Update price");
                setCurrentData(jsonData);
                priceDelta.current = jsonData[0].price;
            }
            
        })
        .catch(error => {
            console.error("Failed to fetch the data.");
        })
        }, 5000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    // hook for the fetch of the first render
    useEffect(() => {
        fetch("https://api.nomics.com/v1/currencies/ticker?key=e976e656db4b58f3a781f96a9918f6f3916e6849&ids=BTC,ETH,XRP,BCH,EOS,DOGE&convert=EUR&per-page=100&page=1", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        })
        .then(result => {
            console.log(result);
        if(result.ok) {
            return result.json();
        }
        throw Error("Error");
        }, (error => {
            throw Error("Network Error");
        }))
        .then(jsonData => {
            setCurrentData(jsonData);
        })
        .catch(error => {
            console.error(error);
        })
    }, [])

    useEffect(() => {
        prevData.current = values;
    }, [values])

 
    return (
        <div>
            {values &&
            <Header values={values} />}
            <Switch>
                <Route path="/error" component={Error} />
                <Route path="/">
                { isLoading? 
                    <LoadingComponent /> :
                    isError?
                    <Redirect to="/error" /> :
                    content && <Main content={content} />}
                </Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
