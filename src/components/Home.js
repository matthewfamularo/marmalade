import React from "react";
import Mix from "./Mix.js";
const Home = ({ mixes, ...props }) => (
  <div className="flex flex-wrap justify-between mixes ph5 ph4-l pb6 pad-bottom">
    {mixes.slice(0, 6).map(mix => (
      <div className="mix mb4">
        <Mix {...props} {...mix} id={mix.key} />
      </div>
    ))}
    ;
  </div>
);

export default Home;
