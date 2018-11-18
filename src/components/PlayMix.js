import React from "react";
import { connect } from "react-redux";
import actions from "../store/actions.js";
import classNames from "classnames";
const PlayMix = ({
  playMix,
  id,
  currentMix,
  playing,
  children,
  className,
  fromMixcloud
}) => (
  <div
    className={classNames({
      [className]: className,
      playing: id === currentMix && playing && fromMixcloud,
      loading: id === currentMix && !playing && !fromMixcloud
    })}
    onClick={() => playMix({ currentMix: id, fromMixcloud: false })}
  >
    {children}
  </div>
);

export default connect(
  state => state,
  actions
)(PlayMix);
