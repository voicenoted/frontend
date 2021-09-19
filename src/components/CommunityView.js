import React from "react";
import SearchBar from "./SearchBar";
import './CommunityView.css';

class CommunityView extends React.Component {

  // eslint-disable-next-line
  constructor(props) {
    super(props)
  }

class CommunityView extends React.Component {
  render() {
    return(
      <div class="wrapper">
        <div class="sectionHeader">Community</div>
        <SearchBar/>
      </div>
    )
  }
}

export default CommunityView;
