import React from "react";

import './Navbar.css';

import img_navbar_listen_filled    from './../assets/icons/navbar_listen_filled.svg';
import img_navbar_community_filled from './../assets/icons/navbar_community_filled.svg';
import img_navbar_library_filled   from './../assets/icons/navbar_library_filled.svg';
import img_navbar_gear_filled      from './../assets/icons/navbar_gear_filled.svg';
import img_navbar_listen_stroke    from './../assets/icons/navbar_listen_stroke.svg';
import img_navbar_community_stroke from './../assets/icons/navbar_community_stroke.svg';
import img_navbar_library_stroke   from './../assets/icons/navbar_library_stroke.svg';
import img_navbar_gear_stroke      from './../assets/icons/navbar_gear_stroke.svg';

class Navbar extends React.Component {

  navbarElements = ['listen', 'discover', 'library', 'settings'];

  constructor(props) {
    super(props);
    this.state = {
      selected: 'listen'
    }
  }

  changeSelected = (newSelected) => {
    this.setState({
      selected: newSelected
    });
  }

  render() {
    return(
      <div className="Navbar">
        {
          this.navbarElements.map((view, i) => {
            return <NavbarButton 
            key={i} 
            changeSelected={this.changeSelected} 
            changeView={this.props.changeView} 
            view={view} 
            selected={this.state.selected === view}
             />
          })
        }
      </div>
    )
  }
}

class NavbarButton extends React.Component {

  navbarIcons = {
    filled: {
      listen: img_navbar_listen_filled,
      discover: img_navbar_community_filled,
      library: img_navbar_library_filled,
      settings: img_navbar_gear_filled
    },
    stroke: {
      listen: img_navbar_listen_stroke,
      discover: img_navbar_community_stroke,
      library: img_navbar_library_stroke,
      settings: img_navbar_gear_stroke
    }
  }

  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.changeView(this.props.view);
    this.props.changeSelected(this.props.view);
  }

  render() {
    return (
      <button className="NavbarButton" onClick={this.onClick}>
        <img alt='icon' src={this.navbarIcons[this.props.selected ? 'filled' : 'stroke'][this.props.view]} />
      </button>
    );
  }
}

export default Navbar;
