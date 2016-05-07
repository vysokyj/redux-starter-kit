import React from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import { increase, decrease } from "../actions/count";

function CountPage({ number, increase, decrease }) {
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

export default connect(
  state => ({ number: state.count.number }),
  { increase, decrease }
)(CountPage)
