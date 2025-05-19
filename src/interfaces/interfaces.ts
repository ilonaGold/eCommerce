export interface AppState {
  view: string;
  userAuth: boolean;
  setView: (view: string) => void;
  setAuth: (isAuth: boolean) => void;
  getState: <K extends keyof Omit<AppState, "getState" | "setView" | "setAuth">>(
    property: K
  ) => AppState[K];
}

export interface Routes {
  [index: string]: string;
}

export interface Rule {
  test: () => boolean;
  message: string;
}
