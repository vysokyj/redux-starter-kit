import React, { PropTypes, Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../components/TodoHeader";
import MainSection from "../components/TodoMainSection";
import * as TodoActions from "../actions/todos";

@connect(
  (state) => ({
    todos: state.todos
  }),
  (dispatch) => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
class TodoPage extends Component {

    static propTypes = {
      todos: PropTypes.array.isRequired,
      actions: PropTypes.object.isRequired,
      addTodo: PropTypes.func.isRequired
    };

    render() {
        const { todos, actions } = this.props;
        return (
            <div>
                <Header addTodo={actions.addTodo} />
                <MainSection todos={todos} actions={actions} />
            </div>
        )
    }
}

export default TodoPage;
