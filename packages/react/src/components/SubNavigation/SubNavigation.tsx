import * as React from "react";

/** The SubNavigation is a toogleable part of the MainNavigation */
export const SubNavigation = ({ children, ...other }) => {
  return <div {...other}>{children}</div>;
};
