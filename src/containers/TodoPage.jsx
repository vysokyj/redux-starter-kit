import React, { PropTypes, Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../components/Header";
import MainSection from "../components/MainSection";
import * as TodoActions from "../actions/todos";

class TodoPage extends Component {

    static propTypes = {
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

TodoPage.propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        todos: state.todos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoPage);