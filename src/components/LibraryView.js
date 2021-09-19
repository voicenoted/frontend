import React from "react";
import SearchBar from "./SearchBar";

class LibraryView extends React.Component {

  // eslint-disable-next-line
  constructor(props) {
    super(props)
  }

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
