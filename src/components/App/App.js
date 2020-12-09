import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import Counter from '../Counter';
import useFetch from '../../hooks/useFetch';
const Context = React.createContext();
const App = () => {
  const { response, isLoading, error } = useFetch({url: '/api/cart', method: 'get'});
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (response !== null) {
      setData(response);
      setItems(response.map(value => ({pid: value.pid, count: value.min})));
    }
  }, [response]);
  return (
    <Context.Provider value={{items, setItems}}>
      <div className="container">
        <h3>Lista produktów</h3>
        <ul >
          {data.map((value) => 
            <li key={value.pid} className="row">{value.name}, cena: {value.price.replace(".", ",")}zł <Counter pid={value.pid} max={value.max} min={value.min} isBlocked={value.isBlocked}/></li>
          )}
          <li className="row">Suma:<div>{items.map((value) => value.count).reduce((a, b) => a + b, 0)}</div></li>
        </ul>
      </div>
    </Context.Provider>
  );
};

export {
    App,
    Context
};
