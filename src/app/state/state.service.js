export class StateService {
  static #instance;
  static #state = new Map();

  constructor() {
    StateService.#instance ??= this;
    return StateService.#instance;
  }

  get(key) {
    return StateService.#state.get(key);
  }

  set(key, value) {
    return StateService.#state.set(key, value);
  }

  show() {
    console.log(StateService.#state);
  }
}
