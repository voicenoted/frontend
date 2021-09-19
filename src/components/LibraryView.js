import React from "react";
import SearchBar from "./SearchBar";
import "./LibraryView.css"
import { PodScroll } from "./PodScroll";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const Discover = styled.div`
  display: flex;
  flex-direction: column;
  height: 90px;
  header {
      text-align: left;
      font-weight: bold;
      text-size: 20px;
      padding: 3px;
      margin-top: 15px;
      margin-left: -20px;
  }
  .row {
    display: flex;
    flex-direction: row;
    color: white;
    padding: 10px;
    max-width: 320px;
    margin-left: -35px;
    Button {
      background-color: #F3AAA5;
      color: white;
      text-align: center;
      justify-item: center;
      margin-right: 10px;
      min-width: 140px;
      box-shadow: 5px 5px white;
      font-size: 12px;
      height: 30px;
      border: none;
      &:hover{
        color: #FFC581;
        background-color: white;
        transition: 5ms;
        box-shadow: 5px 5px #FFC581;
      }
    }
`

class LibraryView extends React.Component {

  render() {
    return(
      <div className="wrapper">
        <div className="sectionHeader">Listen Now</div>
        <SearchBar/>
        <PodScroll title="Recently Played"/>
        <PodScroll title="Saved Episodes"/>
        <Discover>
          <header>Discover</header>
          <div className="categories">
            <div className="row">
              <Button variant="outline-secondary">
                Business
              </Button>
              <Button variant="outline-secondary">
                Psychology
              </Button>
            </div>
            <div className="row">
              <Button variant="outline-secondary">
                Health
              </Button>
              <Button variant="outline-secondary">
                Astronomy
              </Button>
            </div>
          </div>
        </Discover>
      </div>
    )
  }
}

export default LibraryView;
