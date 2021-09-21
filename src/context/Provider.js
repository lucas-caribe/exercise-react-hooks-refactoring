// src/context/Provider.js

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CarsContext from './CarsContext';

const initialCarState = {
  redCar: false,
  blueCar: false,
  yellowCar: false,
};

const initialSignalState = {
  color: 'red',
};

function Provider({ children }) {
  const [cars, setCars] = useState(initialCarState);
  const [signal, setSignal] = useState(initialSignalState);

  const moveCar = (car, side) => {
    setCars({
      ...cars,
      [car]: side,
    });
  };

  const changeSignal = (signalColor) => {
    setSignal({
      ...signal,
      color: signalColor,
    });
  };

  return (
    <CarsContext.Provider value={{ cars, signal, moveCar, changeSignal }}>
      {children}
    </CarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
