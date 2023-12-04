import React from "react";
import Wrapper from ".";

export default {
  title: "Components/Content Related/Wrapper",
  component: Wrapper,
  parameters: {
    componentSubtitle: "Component",
    status: "released",
  },
};

export const WrapperDefault = (args) => (
  <Wrapper {...args}>
    Assisting 91.4 million people in around 83 countries each year, the World
    Food Programme (WFP) is the leading humanitarian organization saving lives
    and changing lives, delivering food assistance in emergencies and working
    with communities to improve nutrition and build resilience. As the
    international community has committed to end hunger, achieve food security
    and improved nutrition by 2030, one in nine people worldwide still do not
    have enough to eat. Food and food-related assistance lie at the heart of the
    struggle to break the cycle of hunger and poverty. On any given day, WFP has
    5,000 trucks, 20 ships and 92 planes on the move, delivering food and other
    assistance to those in most need.
  </Wrapper>
);
