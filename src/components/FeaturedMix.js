import React, { Component } from "react";
import PlayMix from "./PlayMix";
import PlayButton from "./PlayButton";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const FeaturedMix = ({
  name,
  pictures = {},
  picture_primary_color,
  slug,
  ...props
}) => (
  <div
    className="feat w-50-l vh-100 flex items-center justify-center cover bg-center pad-bottom fixed-l left-0"
    style={{
      backgroundImage: `url(${pictures.extra_large})`,
      backgroundColor: `#${picture_primary_color}`
    }}
  >
    <div className="w-100 tc pa3">
      <p className="b biryani f6 white ttu">Featured mix</p>
      <h1 className="mix-title mt0 mb5 anton white ttu">{name}</h1>
      <Link to={`/show/${slug}`} className="absolute absolute--fill z-3" />
      <PlayMix id={slug} className="relative z-5 pointer">
        {/* PlayButton*/}
        <PlayButton />
      </PlayMix>
    </div>
  </div>
);

const getFirstMix = state => {
  let featuredMix;
  if (state.featuredMix) {
    [featuredMix] = state.mixes.filter(mix => mix.id === state.featuredMix);
  } else {
    [featuredMix] = state.mixes.filter(mix => mix.id === state.currentMix);
  }
  const [firstMix = {}] = state.mixes;
  return featuredMix || firstMix;
};

export default connect(state => ({
  ...getFirstMix(state)
}))(FeaturedMix);
