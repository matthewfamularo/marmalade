import React from "react";
import Counter from "./Count.js";

const Stat = ({ statName, statNumber, statWord }) => (
  <div className="mb4">
    <div className="f5 black mb0  b">{statName}</div>
    <Counter end={statNumber} duration={3} />
    <div className="f4" style={{ lineHeight: 1 }}>
      {statWord}
    </div>
  </div>
);

export default Stat;
