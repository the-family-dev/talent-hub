import { makeAutoObservable } from "mobx";
import type { NavigateFunction } from "react-router";

class RouterStore {
  constructor() {
    makeAutoObservable(this);
  }

  public navigate?: NavigateFunction;

  public setNavigate(navigate: NavigateFunction) {
    this.navigate = navigate;
  }
}

export const routerStore = new RouterStore();
