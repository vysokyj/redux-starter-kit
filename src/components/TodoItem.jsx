import React from "react";
import PureRenderComponent from "./PureRenderComponent";
import {
    Button
} from "react-bootstrap";
import classNames from "classnames";
import TodoTextInput from "./TodoTextInput";

class TodoItem extends PureRenderComponent {

    static propTypes = {
        todo: React.PropTypes.object.isRequired,
        editTodo: React.PropTypes.func.isRequired,
        deleteTodo: React.PropTypes.func.isRequired,
        completeTodo: React.PropTypes.func.isRequired
    };


    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false
        };
    }

    handleDoubleClick() {
        this.setState({editing: true});
    }

    handleSave(id, text) {
        if (text.length === 0) this.props.deleteTodo(id);
        else this.props.editTodo(id, text);
        this.setState({editing: false});
    }

    render() {
        const {todo, completeTodo, deleteTodo} = this.props;

        let element;
        if (this.state.editing) {
            element = (
                <TodoTextInput text={todo.text}
                               editing={this.state.editing}
                               onSave={(text) => this.handleSave(todo.id, text)}/>
            )
        } else {
            element = (
                <div className="view" style={{ height: 40 }}>
                    <input className="toggle"
                           style={{ marginRight: 10 }}
                           type="checkbox"
                           checked={todo.completed}
                           onChange={() => completeTodo(todo.id)}/>
                    <label onDoubleClick={this.handleDoubleClick.bind(this)}>
                        {todo.text}
                    </label>
                    <Button bsSize="xsmall" bsStyle="warning"
                            style={{float: "right"}}
                            onClick={() => deleteTodo(todo.id)}
                    >X</Button>
                </div>
            )
        }

        return (
            <li className={classNames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
                {element}
            </li>
        )
    }
}

export default TodoItem;
