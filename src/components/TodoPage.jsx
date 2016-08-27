import React from "react";
import PureRenderComponent from "./PureRenderComponent";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Header from "./TodoHeader";
import MainSection from "./TodoMainSection";
import * as TodoActions from "../actions/todos";

@connect(
    (state) => ({
        todos: state.todos
    }),
    (dispatch) => ({
        todoActions: bindActionCreators(TodoActions, dispatch)
    })
)
class TodoPage extends PureRenderComponent {
    static propTypes = {
        todos: React.PropTypes.array.isRequired,
        todoActions: React.PropTypes.object.isRequired
    };

    render() {
        const {todos, todoActions} = this.props;
        return (
            <div>
                <Header addTodo={todoActions.addTodo}/>
                <MainSection todos={todos} actions={todoActions}/>
            </div>
        )
    }
}

export default TodoPage;
