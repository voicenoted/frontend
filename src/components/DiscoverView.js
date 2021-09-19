import React from "react";
import SearchBar from "./SearchBar";
import './DiscoverView.css';
import { PodScroll } from "./PodScroll";

class DiscoverView extends React.Component {

  render() {
    return(
      <div className="wrapper">
        <div className="sectionHeader">Discover</div>
        <SearchBar/>
        <PodScroll title="From your library"/>
        <PodScroll title="Recommended for you"/>
        <PodScroll title="Popular"/>
      </div>
    )
  }
}

export default DiscoverView;
