import React from "react";
import axios from 'axios';
import audioCoverImg from './../assets/audio_cover_1.png';
import playButton from './../assets/play.svg';
import pauseButton from './../assets/pause.svg';
import audio from './../assets/speech.flac';
import './ListeningView.css';

class ListeningView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      addingNote: false,
      addNoteStartTime: 0,
      addNoteEndTime: 0,
      currTime: 0
    };

    this.audioRef = React.createRef();
    
    this.audioElement = document.getElementById("audio")
  }

  getAudioFile = async (path) => {
    let data = await (await fetch(path)).blob();
    return new File([data], 'FILE_NAME', { type: 'audio/flac' });
  }

  togglePlay = () => {
    if (this.state.playing) {
      this.setState({
        playing: false
      });
      this.audioRef.current.pause();
    }
    else {
      this.setState({
        playing: true
      });
      this.audioRef.current.play();
    }
  }

  startAddNote = () => {
    this.setState({
      addingNote: true,
      addNoteStartTime: this.audioRef.current.currentTime
    });
  }

  stopAddNote = () => {
    this.setState({
      addingNote: false,
      addNoteEndTime: this.audioRef.current.currentTime
    }, async () => {
      
      let formData = new FormData();
      formData.append('file', await this.getAudioFile(audio));
      formData.append('startTime', Math.floor(this.state.addNoteStartTime));
      formData.append('endTime', Math.ceil(this.state.addNoteEndTime));
      
      let res = await axios({
        method: 'post',
        url: 'https://voicenoted.herokuapp.com/speechToText',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).catch((err) => { console.log(err); });

      console.log(res.data.result);

    });
  }

  timeUpdate = () => {
    this.setState({
      currTime: this.audioRef.current.currentTime
    })
  }

  handleTimelineChange = (e) => {
    //if (!this.state.addingNote) {
    this.audioRef.current.currentTime = e.target.value;
    //}
  }

  render() {
    
    const addNoteText = this.state.addingNote ? 'Stop' : <><i className="fas fa-fw fa-plus"></i> Add Note</>;

    return(
      <div className="ListeningView">
        <div className="top-wrapper">
          <img src={audioCoverImg} alt="audio_cover_1.png" />
          <div className="title">{this.props.title}</div>
          <div className="subtitle">{this.props.subtitle}</div>
        </div>
        
        <div className="player">
          <input
            type="range"
            min="0"
            max={this.audioRef.current?.duration}
            value={this.state.currTime}
            onChange={this.handleTimelineChange}
            disabled={this.state.addingNote}
          />
          <img src={this.state.playing ? pauseButton : playButton} alt="play pause" onClick={this.togglePlay} className="playPause" />
          <audio ref={this.audioRef} src={audio} type='audio/flac' onTimeUpdate={this.timeUpdate} />
        </div>

        <button className="addNote" onClick={this.state.addingNote ? this.stopAddNote : this.startAddNote}>
          {addNoteText}
        </button>
      </div>
    )
  }
}

export default ListeningView;
