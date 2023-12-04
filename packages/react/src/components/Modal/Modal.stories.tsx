import React, { useState } from "react";
import Modal from ".";

export default {
  title: "Components/Content Related/Modal",
  component: Modal,
  parameters: {
    componentSubtitle: "Component",
    status: "released",
  },
};

export const ModalDefault: Story = {
  render: (args) => {
    const [isOpen, setOpen] = useState(args.open);

    const handleModalClose = () => {
      setOpen(!isOpen);
    };

    return (
      <>
        Use the open property in the table below to enable the preview.{" "}
        <Modal {...args} onRequestClose={handleModalClose} open={isOpen}>
          {args.children}
        </Modal>
      </>
    );
  },
  args: {
    children: "Text",
    modalLabel: "Modal label",
    modalHeading: "Modal heading",
    modalText: "Modal text",
    className: "some-class",
    open: false,
  },
};
