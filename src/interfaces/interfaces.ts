export interface AppState {
  view: string;
  userAuth: boolean;
  setView: (view: string) => void;
  setAuth: (isAuth: boolean) => void;
  getState: <K extends keyof Omit<AppState, "getState">>(property: K) => AppState[K];
}
