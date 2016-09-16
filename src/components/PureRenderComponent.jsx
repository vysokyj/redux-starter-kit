import React from "react";

var shallowCompare = require("react-addons-shallow-compare");

class PureRenderComponent extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}

export default PureRenderComponent;
