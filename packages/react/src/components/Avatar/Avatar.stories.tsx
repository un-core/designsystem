import React from "react";
import Avatar from ".";

export default {
  title: "Components/UI Elements/Avatar",
  component: User,
  parameters: {
    componentSubtitle: "Component",
    status: "released",
  },
};

export const AvatarDefault = (args) => <Avatar {...args} />;

AvatarDefault.args = {
  children: "Max Mustermann",
  image:
    "https://www.wfp.org/sites/default/files/styles/page_accordion/public/images/ourwork_humanitarian.jpg?itok=R0ymBwxH",
};
