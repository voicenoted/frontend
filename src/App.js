import Navbar from './components/Navbar';
import React, { Component } from "react";
import ListeningView from './components/ListeningView';
import DiscoverView from './components/DiscoverView';
import SettingsView from './components/SettingsView';
import NotesView from './components/NotesView'

import './App.css';

import audio from './components/audio.json';

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
      listen: <ListeningView title={audio[0].title} subtitle={audio[0].subtitle} />,
      discover: <DiscoverView />,
      notes: <NotesView />,
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
