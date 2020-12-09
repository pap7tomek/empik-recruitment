import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import './styles.css';
import { Context } from "../App/App";
import _ from 'lodash';
import axios from 'axios';
const Counter = ({ pid, max, min, isBlocked = false }) => {
  const [amount, setAmount] = useState(min);
  const { setItems } = useContext(Context);
  const isFirstRender = useRef(true);
  const increase = () => {
    if (amount < max) setAmount(prevState => prevState+1);
  }
  const decrease = () => {
    if (amount > min) setAmount(prevState => prevState-1);
  }
  const verify = useCallback(
    _.debounce(async (amount) => {
      let data;
      try {
        data = await axios.post('/api/product/check', {
          pid: pid,
          quantity: amount
        });
      } catch (error) {
        if (error.response.data.isError === true) {
          setAmount(min);
        }
      }
    }, 500),
    []
  );
  useEffect(() => {
    if (!isFirstRender.current) {
      verify(amount)
      setItems(prevState => prevState.filter((value) => value.pid !== pid).concat({
        pid: pid,
        count: amount
      }))
    }
  }, [amount])

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return (
    <span>
      <button disabled={isBlocked} onClick={() => increase()}>+</button>&nbsp;&nbsp;
      <button disabled={isBlocked} onClick={() => decrease()}>-</button>&nbsp;&nbsp;
      <span className="text">Obecnie masz {amount} sztuk produktu</span>
    </span>
  )
}
export default Counter;