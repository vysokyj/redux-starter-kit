import { Record } from "immutable";
export default class Todo extends Record({
  text: null,
  completed: false,
  id: null
}) {
  getAB() {
    return this.a + this.b;
  }
}
