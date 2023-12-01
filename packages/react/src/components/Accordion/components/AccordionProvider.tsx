import * as React from "react";
import { AccordionContext, AccordionProviderValue } from "../utils/constants";

const AccordionProvider = (props: {
  value: AccordionProviderValue;
  children?: React.ReactNode;
}) => <AccordionContext.Provider {...props} />;

export { AccordionProvider };
