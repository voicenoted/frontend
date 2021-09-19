import React from "react";
import SearchBar from "./SearchBar";
import './DiscoverView.css';
import { PodScroll } from "./PodScroll";

import { Title, SubHeader } from './PageHeader';

class DiscoverView extends React.Component {

  render() {
    return(
      <div className="wrapper">
        <Title title='Discover' />
        {/* <div className="sectionHeader">Discover</div> */}
        <SearchBar/>
        <PodScroll title="From your library"/>
        <PodScroll title="Recommended for you"/>
        <PodScroll title="Popular"/>
      </div>
    )
  }
}

export default DiscoverView;
