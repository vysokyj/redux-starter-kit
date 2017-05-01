import chai from "chai";
import chaiShallowDeepEqual from "chai-shallow-deep-equal";
import * as actions from "../src/actions/todos";
import * as types from "../src/constants/ActionTypes";

chai.use(chaiShallowDeepEqual);

describe("actions", () => {
  it("should create an action to add a todo", () => {
    const text = "Finish docs";
    const expectedAction = {
      type: types.ADD_TODO,
      text
    }
    chai.expect(actions.addTodo(text)).to.shallowDeepEqual(expectedAction)
  })
})
