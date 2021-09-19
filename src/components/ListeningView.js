import React from "react";
import axios from 'axios';
import audioCoverImg from './../assets/audio_cover.png';
import playButton from './../assets/play.svg';
import pauseButton from './../assets/pause.svg';
import audio from './../assets/speech.flac';
import './ListeningView.css';

const TOKENNNNNNNNN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYzMjAxODcyMiwiZXhwIjoxNjMyMDIyMzIyLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1heHF2dkB2b2ljZS1hZDM0MC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWF4cXZ2QHZvaWNlLWFkMzQwLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoic29tZS11aWQifQ.OhYG56dJc6BEvNUXFZCnmtfgvZPzbTUZsEPvIgXZ55UjlQO1KDwP-HkR6bchxaqyGbQs1Dz9CMZY14xdZu9CC-aIsKzO87jO-qvJd66XPsYE6mJCGmUzEu_I4pcavH6aU3EEEpbWausMs11M2C9GFdhvBs-iYYSkztSAMdZfVR2D_FlEU4A91ISnQH3VNYv79bLV9DRn9SURpAc8PTKzsrg0yK5g4XtUD3854Rkak7ZSaec_WVC8DNwwl-KfoCw4GwFH-nIJU2_HfI4dCrOORudHOKdEq8-roYHhvYsC5Vqx4XPOE0nsOey_aEHvSNeqjoGQ5JW0ssX0_AQOgmkRVA';

class ListeningView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      addingNote: false,
      addNoteStartTime: 0,
      addNoteEndTime: 0,
      currTime: 0,
      duration: 0,
      popupOpen: false,
      popupError: false
    };

    this.audioRef = React.createRef();
    
    this.audioElement = document.getElementById("audio")
  }

  formatTime = (seconds) => {
    let time = Math.floor(seconds);
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    return (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
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

      let startTime = Math.floor(this.state.addNoteStartTime);
      let endTime = Math.ceil(this.state.addNoteEndTime);
      
      let formData = new FormData();
      formData.append('file', await this.getAudioFile(audio));
      formData.append('startTime', startTime);
      formData.append('endTime', endTime);
      
      let speechToTextRes = await axios({
        method: 'post',
        // url: 'http://localhost:8000/speechToText',
        url: 'https://voicenoted.herokuapp.com/speechToText',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      }).catch((err) => {
        this.setState({
          popupError: true,
          popupOpen: true
        })
      });

      console.log(speechToTextRes.data)

      await axios.post('https://voicenoted.herokuapp.com/saveNote', {
        token: TOKENNNNNNNNN,
        timestamp: {
          start: startTime,
          end: endTime
        },
        audioid: 1,
        content: speechToTextRes.data.text,
        audioLink: speechToTextRes.data.audioLink
      }).catch((err) => {
        this.setState({
          popupError: true,
          popupOpen: true
        })
      });

      this.setState({
        popupError: false,
        popupOpen: true
      })
    });
  }

  timeUpdate = () => {
    this.setState({
      currTime: this.audioRef.current.currentTime
    })
  }

  handleTimelineChange = (e) => {
    this.audioRef.current.currentTime = e.target.value;
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
          <div className="time-wrapper">
            <input
              type="range"
              min="0"
              step="0.1"
              max={Math.ceil(this.state.duration)}
              value={this.state.currTime}
              onChange={this.handleTimelineChange}
              disabled={this.state.addingNote}
            />
            <span className="time left">{this.formatTime(this.state.currTime)}</span>
            <span className="time right">{this.formatTime(this.state.duration)}</span>
          </div>
          <img src={this.state.playing ? pauseButton : playButton} alt="play pause" onClick={this.togglePlay} className="playPause" />
          <audio ref={this.audioRef} src={audio} type='audio/flac' onTimeUpdate={this.timeUpdate} onDurationChange={() => { this.setState({ duration: this.audioRef.current.duration }) }} />
        </div>

        <button className="addNote" onClick={this.state.addingNote ? this.stopAddNote : this.startAddNote}>
          {addNoteText}
        </button>

        <div style={{ display: this.state.popupOpen ? 'block' : 'none', position: 'absolute', top: 24, left: 24, backgroundColor: this.state.popupError ? '#ff0000' : '#338B31', borderRadius: 8, padding: 12, color: '#fff' }}>
          <button style={{ margin: -12, marginRight: 12, background: 'none', color: '#fff' }} onClick={() => {
            this.setState({ popupOpen: false });
          }}>&times;</button>
          {this.state.popupError ? 'Failed to upload voicenote :(' : 'Voicenote added successfully :D'}
        </div>
      </div>
    )
  }
}

export default ListeningView;
