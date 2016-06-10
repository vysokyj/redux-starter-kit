import React from "react";

var shallowCompare = require("react-addons-shallow-compare");

class PureRenderComponent extends React.Component {
    //
    // state = {};
    // props = {};
    // refs = {};

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}

export default PureRenderComponent;
