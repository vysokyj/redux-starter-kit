import React from "react";
import PureRenderComponent from "./PureRenderComponent";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import { increase, decrease } from "../actions/count";

@connect(
    state => ({ number: state.count.number }),
    { increase, decrease }
)
class CountPage extends PureRenderComponent {
    render() {
        const { increase, decrease, number } = this.props;
        return (
          <div>
              <h1>Simple Counter</h1>
              <p>Some state changes: {number} </p>
              <ButtonGroup>
                <Button bsStyle="success" onClick={() => increase(1)}>Increase</Button>
                <Button bsStyle="danger" onClick={() => decrease(1)}>Decrease</Button>
              </ButtonGroup>
          </div>
        )
    }
}

export default CountPage;
