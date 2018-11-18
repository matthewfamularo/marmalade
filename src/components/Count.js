import React from "react";
import CountUp from "react-countup";

const Counter = ({ start = 0, end, ...props }) => (
  <div className="f1 b orange mb0" style={{ lineHeight: 1 }}>
    <CountUp
      start={start}
      end={Math.round(end)}
      useEasing={true}
      useGrouping={true}
      separator=","
      {...props}
    />
  </div>
);

export default Counter;
