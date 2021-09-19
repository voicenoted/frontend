import React from "react";
import SearchBar from "./SearchBar";

class LibraryView extends React.Component {

  render() {
    return(
      <div class="wrapper">
        <div class="sectionHeader">Library</div>
        <SearchBar/>
      </div>
    )
  }
}

export default LibraryView;
