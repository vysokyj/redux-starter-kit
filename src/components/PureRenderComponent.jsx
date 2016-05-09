import React, { PropTypes, Component } from "react";

var shallowCompare = require("react-addons-shallow-compare");

class PureRenderComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
}

export default PureRenderComponent;
