import React, { Component } from "react"
import { Card } from "react-bootstrap"
import audioCoverImg1 from './../assets/audio_cover_1.png';
import audioCoverImg2 from './../assets/audio_cover_2.png';
import audioCoverImg3 from './../assets/audio_cover_3.png';
import styled from "styled-components"

import { Title, SubHeader } from './PageHeader';

const Podcasts = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow: scroll;
    // margin-top: 10px;
    .pod {
      padding: 10px 0;
    }
    .pic {
        width: 88px;
    }
    .title {
        font-size: 11px;
        font-weight: bold;
        text-align: left;
    }
    .subtitle {
        margin: 1px;
        font-size: 10px;
        text-align: left;
        opacity: 75%;
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    & header {
        text-align: left;
        font-weight: bold;
        text-size: 20px;
        padding: 3px;
        margin-top: 15px;
        margin-bottom: -10px;
    }
`

export class PodScroll extends Component {
    render() {
        return(
            <Wrapper>
                <SubHeader title={this.props.title} />
                {/* <header>{this.props.title}</header> */}
                <Podcasts>
                    <Card className="pod">
                        <Card.Img className="pic" variant="top" src={audioCoverImg1} />
                        <Card.Body>
                            <Card.Title className="title">The Side Project Perfectionism</Card.Title>
                            <Card.Text className="subtitle">Stories & Cities</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="pod" style={{ width: "18rem" }}>
                        <Card.Img className="pic" variant="top" src={audioCoverImg3} />
                        <Card.Body>
                            <Card.Title className="title">How to Deal with Recent Stress</Card.Title>
                            <Card.Text className="subtitle">Kalyn's Coffee Talk</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="pod" style={{ width: "18rem" }}>
                        <Card.Img className="pic" variant="top" src={audioCoverImg2} />
                        <Card.Body>
                            <Card.Title className="title">Black Holes</Card.Title>
                            <Card.Text className="subtitle">SpaceTalk Radio</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="pod">
                        <Card.Img className="pic" variant="top" src={audioCoverImg1} />
                        <Card.Body>
                            <Card.Title className="title">The Side Project Perfectionism</Card.Title>
                            <Card.Text className="subtitle">Stories & Cities</Card.Text>
                        </Card.Body>
                    </Card>
                </Podcasts>
            </Wrapper>
        )
    }
}