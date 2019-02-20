/*global Mixcloud*/
import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../store/actions.js";

class Player extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.widgetReady) {
      return;
    }

    if (nextProps.currentMix !== this.props.currentMix) {
      this.widget.load(nextProps.currentMix, true);
    } else if (!nextProps.fromMixcloud) {
      this.widget.togglePlay();
    }
  }

  mountAudio = async () => {
    const { playMix, setWidgetReady } = this.props;
    this.widget = Mixcloud.PlayerWidget(this.player);
    await this.widget.ready;
    setWidgetReady(true);
    this.widget.events.pause.on(() =>
      playMix({ playing: false, fromMixcloud: true })
    );
    this.widget.events.play.on(() =>
      playMix({ playing: true, fromMixcloud: true })
    );
  };

  componentDidMount() {
    this.mountAudio();
  }

  actions = {
    togglePlay: () => {
      this.widget.togglePlay();
    },
    playMix: mixName => {
      const { currentMix } = this.state;
      if (mixName === currentMix) {
        return this.widget.togglePlay();
      }
      this.setState({ currentMix: mixName });
      this.widget.load(mixName, true);
    }
  };

  render() {
    return (
      <iframe
        width="100%"
        height="60"
        // src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${
        //   firstMix.key
        // }`}
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=/NTSRadio/yayo-1st-november-2018/"
        frameBorder="0"
        className="player db fixed bottom-0 z-999"
        ref={player => (this.player = player)}
      />
    );
  }
}

export default connect(
  state => state,
  actions
)(Player);
