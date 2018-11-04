import React, { Component } from "react";
import PlayMix from "./PlayMix";
import PlayButton from "./PlayButton";

const FeaturedMix = ({ name, pictures = {}, ...props }) => (
  <div
    className="w-50-l vh-100 flex items-center justicy-content cover bg-center bg-featured pad-bottom fixed-l left-0 overlay"
    style={{ backgroundImage: `url(${pictures.extra_large})` }}
  >
    <PlayMix {...props}>
      <div className="w-100 tc pa3">
        <p className="b biryani f6 white ttu">Featured mix</p>
        <h1 className="mix-title mt0 mb2 anton white ttu">{name}</h1>
        {/* PlayButton*/}
        <PlayButton />
      </div>
    </PlayMix>
  </div>
);

export default FeaturedMix;
