import React, { PropTypes, Component } from "react";
import TodoTextInput from "./TodoTextInput";

class TodoHeader extends Component {

    static propTypes = {
        addTodo: PropTypes.func.isRequired
    };

    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }

    render() {
        return (
            <div className="header">
                <h1>Todos</h1>
                <TodoTextInput newTodo
                               onSave={this.handleSave.bind(this)}
                               placeholder="What needs to be done?" />
            </div>
        )
    }
}

export default TodoHeader;