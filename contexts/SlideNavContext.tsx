import { createContext, useContext } from "react";

export interface TabHandler {
  next: () => boolean; // returns true if tab advanced (intercept slide nav)
  prev: () => boolean; // returns true if tab retreated (intercept slide nav)
}

export const SlideNavContext = createContext<{
  setTabHandler: (h: TabHandler | null) => void;
}>({ setTabHandler: () => {} });

export const useSlideNav = () => useContext(SlideNavContext);
