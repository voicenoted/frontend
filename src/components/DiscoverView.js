import React from "react";
import SearchBar from "./SearchBar";
import './DiscoverView.css';


class CommunityView extends React.Component {
  render() {
    return(
      <div class="wrapper">
        <div class="sectionHeader">Discover</div>
        <SearchBar/>
      </div>
    )
  }
}

export default CommunityView;
