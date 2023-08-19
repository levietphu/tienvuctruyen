import axios from "axios";
import HistoryTransition from "../components/coin/HistoryTransition";
import LoadCents from "../components/coin/LoadCents";
import { useState, useEffect } from "react";

const Coin = () => {
  const getHistoryTransition = () => {};

  useEffect(() => {}, []);

  return (
    <div className="coin__personal">
      <LoadCents />
      <HistoryTransition />
    </div>
  );
};

export default Coin;
