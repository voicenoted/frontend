import React from "react";
import audioCoverImg from './../assets/audio_cover_1.png';
import playButton from './../assets/play.svg';
import pauseButton from './../assets/pause.svg';
import audio from './../assets/speech.flac';
import './ListeningView.css';

class ListeningView extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      playing: false
    };
  }

  togglePlay = () => {
    this.setState({
      playing: !this.state.playing
    })
  }

  render() {
    return(
      <div className="ListeningView">
        <div class="top-wrapper">
          <img src={audioCoverImg} alt="audio_cover_1.png" />
          <div class="title">{this.props.title}</div>
          <div class="subtitle">{this.props.subtitle}</div>
        </div>
        
        <div className="player">
        <img src={this.state.playing ? pauseButton : playButton} alt="play pause" onClick={this.togglePlay} />
          <audio src={audio} controls type='audio/flac' />
        </div>

        <button className="addNote">
          <i class="fas fa-plus"></i>
          &nbsp;
          Add Note
        </button>
      </div>
    )
  }
}

export default ListeningView;
