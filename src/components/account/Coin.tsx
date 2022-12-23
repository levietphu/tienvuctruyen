import HistoryTransition from "./coin/HistoryTransition";
import LoadCents from "./coin/LoadCents";

const Coin = () => {
  return (
    <div className="coin__personal">
      <LoadCents />
      <HistoryTransition />
    </div>
  );
};

export default Coin;
