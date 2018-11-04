import React from "react";

const AudioPlayer = props => (
  <iframe
    width="100%"
    height="60"
    src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FEncoreAmsterdam%2Fencore-mixshow-286%2F"
    frameBorder="0"
    className="player db fixed bottom-0 z-999"
    refs={refs}
  />
);

export default AudioPlayer;
