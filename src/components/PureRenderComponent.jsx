import React from "react";

var shallowCompare = require("react-addons-shallow-compare");

class PureRenderComponent extends React.Component {

    constructor() {
        super();
        this.props = null;
        this.state = null;
        this.refs = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}

export default PureRenderComponent;
