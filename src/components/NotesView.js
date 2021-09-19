import React from 'react';
import axios from 'axios';
import playButton from './../assets/play.svg';
import pauseButton from './../assets/pause.svg';
import dotdotdot from './../assets/dotdotdot.svg';
// import greenRect from './../assets/green_rect.svg';

import './NotesView.css';

import audio from './audio.json';

class NotesView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      editingNote: false,
      editNoteIndex: 0,
      editCounter: 0
    };
  }

  updateNotes = async () => {

    let res = await axios.get('https://voicenoted.herokuapp.com/getNotes', {
      params: {
        // token: TOKENNNNNNNNN,
        audioid: 1,
      }
    });

    this.setState({
      notes: res.data.sort((a, b) => a.timestamp.start - b.timestamp.start)
    });
  }

  editNote = (index) => {
    this.setState((state) => ({
      editingNote: true,
      editNoteIndex: index,
      editCounter: state.editCounter + 1
    }));
  }

  stopEditNote = () => {
    this.setState({
      editingNote: false
    });
  }

  setNoteContent = (index, content) => {
    let _notes = this.state.notes.slice();
    _notes[index].content = content;
    this.setState({
      notes: _notes
    });
  }

  componentDidMount() {
    this.updateNotes();
  }

  renderNoteView() {
    return (
      <div className="NotesView">
        <h2>Voicenotes</h2>
        {/* <img src={greenRect} alt="green rectangle" /> */}
        <NotesSection display={!this.state.editingNote} title={audio[0].title} subtitle={audio[0].subtitle} notes={this.state.notes} editNote={this.editNote} />
        <EditNoteView display={this.state.editingNote} data={this.state.notes[this.state.editNoteIndex]} index={this.state.editNoteIndex} counter={this.state} stopEditNote={this.stopEditNote} setNoteContent={this.setNoteContent} />
      </div>
    );
  }

  render() {
    return /*this.state.editingNote ? this.renderEditNoteView() :*/ this.renderNoteView();
  }
}

class NotesSection extends React.Component {
  
  render() {
    if (!this.props.display) {
      return null;
    }
    return <div className="section">
      <h2>{this.props.title}</h2>
      <p>{this.props.subtitle}</p>
      {this.props.notes.map((n, i) => {
        return <Note key={i} index={i} data={n} editNote={this.props.editNote} />
      })}
    </div>;
  }
}

class Note extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      playing: false
    }
    this.audioRef = React.createRef();
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

  edit = () => {
    this.props.editNote(this.props.index);
  }
  
  render() {
    return <div className="note">
      <audio ref={this.audioRef} src={this.props.data.audioLink} type='audio/flac' loop />
      <img src={this.state.playing ? pauseButton : playButton} alt="play pause" onClick={this.togglePlay} className="playPause" />
      <span className="content">{this.props.data.content}</span>
      {this.props.editNote !== undefined && <img src={dotdotdot} alt="dotdotdot" className="dotdotdot" onClick={this.edit} />}
    </div>;
  }
}

class EditNoteView extends React.Component {

  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.counter !== prevProps.counter) {
      if (this.textareaRef.current) {
        this.textareaRef.current.value = this.props.data?.content ? this.props.data.content : '';
      }
    }
  };

  save = async () => {

    let newContent = this.textareaRef.current.value;

    await axios.post('https://voicenoted.herokuapp.com/updateNote', {
      // token: TOKENNNNNNNNN,
      noteid: this.props.data.noteid,
      content: newContent
    }).catch((err) => {
      this.props.stopEditNote();
    });
    this.props.setNoteContent(this.props.index, newContent);
    this.props.stopEditNote();
  }
  
  render() {
    if (!this.props.display) {
      return null;
    }
    return (
      <div className="EditNoteView">
        <Note data={this.props.data} />
        <textarea ref={this.textareaRef}></textarea>
        <div>
          <button onClick={this.save}>Save</button>
        </div>
      </div>
    );
  }
}

export default NotesView;