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
        actions: bindActionCreators(TodoActions, dispatch)
    })
)
class TodoPage extends PureRenderComponent {
    static propTypes = {
        todos: React.PropTypes.array.isRequired,
        actions: React.PropTypes.object.isRequired,
        addTodo: React.PropTypes.func.isRequired
    };

    render() {
        const {todos, actions} = this.props;
        return (
            <div>
                <Header addTodo={actions.addTodo}/>
                <MainSection todos={todos} actions={actions}/>
            </div>
        )
    }
}

export default TodoPage;
