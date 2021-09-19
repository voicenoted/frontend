import Navbar from './components/Navbar';
import React, { Component } from "react";
import ListeningView from './components/ListeningView';
import DiscoverView from './components/DiscoverView';
import LibraryView from './components/LibraryView';
import SettingsView from './components/SettingsView';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'listen'
    };
  }

  changeView = (newView) => {
    this.setState({
      view: newView
    });
  }

  render() {

    let viewComponents = {
      listen: <ListeningView title="412. Side Project Perfectionism" subtitle="Stories &amp; Cities" />,
      discover: <DiscoverView />,
      library: <LibraryView />,
      settings: <SettingsView />,
    }

    return (
      <div className="App">
        {viewComponents[this.state.view]}
        <Navbar changeView={this.changeView} />
      </div>
    );
  }
}

export default App;
