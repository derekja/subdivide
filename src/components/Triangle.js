import React, { Component } from 'react';
import Radium from 'radium';
import {
  SW,
  NE
} from '../constants/BlenderLayoutConstants';

function triangleStyle({corner, color, size, layout}) {
  var offset = (size + 3) / 2;
  var style = {
    width: size + 'px',
    height: size + 'px',
    position: 'absolute',
    backgroundColor: color,
    opacity: 0,
    display: layout.dividerDown ? 'none' : 'block',
    transition: 'opacity 0.2s',
    border: '1px solid #c0c0d0',
  //  boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.88)',
    ':hover': {
      opacity: 1
    }
  };

  switch (corner) {
    case NE:
      return {
        ...style,
        top: 0,
        right: 0,
        cursor: 'grab',
        transform: 'translate3d(' + (offset) + 'px,' + (-offset) + 'px, 0) rotate(45deg)'
      };
    case SW:
      return {
        ...style,
        bottom: 0,
        left: 0,
        cursor: 'grab',
        transform: 'translate3d(' + (-offset) + 'px,' + (offset) + 'px, 0) rotate(45deg)'
      };
  }
  return style;
}

@Radium
export default class Triangle extends Component {
  constructor(props, context) {
    super(props, context);

    this.onMouseDown = () => {
      const {actions, corner, pane} = this.props;
      actions.setCornerDown({...pane, corner: corner});
    };

    this.onMouseUp = () => {
      const {actions} = this.props;
      actions.setCornerDown(undefined);
    };
  }

  render() {
    const styles = triangleStyle(this.props);
    return (
      <div style={styles} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}/>
    );
  }
}


