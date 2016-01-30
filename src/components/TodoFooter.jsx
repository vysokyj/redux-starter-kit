import React, { PropTypes, Component } from "react";
import classnames from "classnames";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/TodoFilters";

const FILTER_TITLES = {
    [SHOW_ALL]: "All",
    [SHOW_ACTIVE]: "Active",
    [SHOW_COMPLETED]: "Completed"
};

class TodoFooter extends Component {

    static propTypes = {
        completedCount: PropTypes.number.isRequired,
        activeCount: PropTypes.number.isRequired,
        filter: PropTypes.string.isRequired,
        onClearCompleted: PropTypes.func.isRequired,
        onShow: PropTypes.func.isRequired
    };

    renderTodoCount() {
        const { activeCount } = this.props;
        const itemWord = activeCount === 1 ? "item" : "items";

        return (
            <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
        )
    }

    renderFilterLink(filter) {
        const title = FILTER_TITLES[filter];
        const { filter: selectedFilter, onShow } = this.props;

        return (
            <button key={filter} className={classnames({
                selected: filter === selectedFilter,
                "btn": true,
                "btn-primary": true
                })}
               style={{ cursor: "pointer" }}
               onClick={() => onShow(filter)}>
                {title}
            </button>
        )
    }

    renderClearButton() {
        const { completedCount, onClearCompleted } = this.props;
        if (completedCount > 0) {
            return (
                <button className="clear-completed btn btn-danger"
                        onClick={onClearCompleted} >
                    Clear completed
                </button>
            )
        }
    }

    render() {
        return (
            <div className="footer">
                <p>{this.renderTodoCount()}</p>
                <div className="btn-group">
                    {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
                        this.renderFilterLink(filter)
                    )}
                    {this.renderClearButton()}
                </div>
            </div>
        )
    }
}

export default TodoFooter;