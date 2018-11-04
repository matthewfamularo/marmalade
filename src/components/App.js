/*global Mixcloud*/
import React, { Component } from "react";
import FeaturedMix from "./FeaturedMix.js";
import Header from "./Header.js";
import Home from "./Home.js";
import Archive from "./Archive.js";
import About from "./About.js";
import mixesData from "../data/mixes.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentMix: "",
      mixIds: mixesData,
      mix: null,
      mixes: []
    };
  }

  fetchMixes = async () => {
    const { mixIds } = this.state;
    mixIds.map(async id => {
      try {
        const response = await fetch(`https://api.mixcloud.com${id}`);
        const data = await response.json();
        this.setState((prevState, props) => ({
          mixes: [...prevState.mixes, data]
        }));
      } catch (error) {
        console.log(error);
      }
    });
  };

  mountAudio = async () => {
    this.widget = Mixcloud.PlayerWidget(this.player);
    await this.widget.ready;
    this.widget.events.pause.on(() => this.setState({ playing: false }));
    this.widget.events.play.on(() => this.setState({ playing: true }));
  };

  componentDidMount() {
    this.fetchMixes();
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
    const [firstMix = {}] = this.state.mixes;

    return (
      <Router>
        <div>
          <div className="flex-l justify-end">
            {/* FeaturedMix */}
            <FeaturedMix
              {...this.state}
              {...this.actions}
              {...firstMix}
              id={firstMix.key}
            />
            <div className="w-50-l relative z-1">
              {/* Header */}
              <Header />

              {/* Routed page*/}
              <Route
                exact
                path="/"
                render={() => <Home {...this.state} {...this.actions} />}
              />
              <Route
                path="/archive"
                render={() => <Archive {...this.state} {...this.actions} />}
              />
              <Route
                path="/about"
                render={() => <About {...this.state} {...this.actions} />}
              />
            </div>
          </div>
          {/* Audio Player*/}
          <iframe
            width="100%"
            height="60"
            src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${
              firstMix.key
            }`}
            frameBorder="0"
            className="player db fixed bottom-0 z-999"
            ref={player => (this.player = player)}
          />
        </div>
      </Router>
    );
  }
}

export default App;
