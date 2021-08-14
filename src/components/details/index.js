import React, { useState, useEffect } from 'react';
import './index.css'
import { getStockDetails } from '../../controller/api';

let interval ;
const Details = ({ stockList, current, onNext, onPrev, timer = 6000 }) => {
    const [selectedStock, setSelectedStock] = useState(stockList[current])
    const getUpdate = () => {
       interval  = setInterval(() => getStockDetails(selectedStock.Symbol)
            .then(data => {
                if(data && data.Symbol){
                    setSelectedStock(data)
                }
            }), timer)
    }

    useEffect(() => {
        getUpdate();
        return () => {
            clearInterval(interval);
        }
    })

    useEffect(() => {
        setSelectedStock(stockList[current]);
    }, [stockList, current])

    return (<div className="detail-wrapper">
        <div><label>Name</label> <span>{selectedStock.Name}</span></div>
        <div> <label>Symbol</label><span>{selectedStock.Symbol}</span></div>
        <div><label>Description</label><span>{selectedStock.Description}</span></div>
        <div><label>PE Ration</label><span>{selectedStock.PERatio}</span></div>
        <div><label>Industry</label><span>{selectedStock.Industry}</span></div>
        <div><label>Market Cap</label><span>{selectedStock.MarketCapitalization}</span></div>
        <ul className="wrapper"> <li onClick={onPrev}> Prev </li> <li onClick={onNext}> Next</li> </ul>
    </div>
    )
}

export default Details;