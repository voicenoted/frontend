import React from 'react';

import greenRect from './../assets/green_rect.svg';
import pinkSlash from './../assets/pink_slash.svg';

const Title = (props) => {
  return (
    <div>
      <h2 style={{ zIndex: 100, position: 'relative' }}>
        {props.title}
      </h2>
      <img src={greenRect} alt="green rectangle" style={{ position: 'relative', transform: 'translate(0, -1.4em)' }} />
      <img src={pinkSlash} alt="pink slash" style={{ position: 'relative', height: 26, transform: 'translate(0.1em, -1.7em)' }} />
    </div>
  )
}

const SubHeader = (props) => {
  return (
    <div>
      <h2 style={{ fontSize: 16, marginTop: '1em' }}>{props.title}</h2>
    </div>
  )
}

export { Title, SubHeader };