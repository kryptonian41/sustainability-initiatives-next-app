import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Pagination from ".";

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    prevClickAction: {
      action: "Previous Page Button Clicked",
    },
    nextClickAction: {
      action: "Next Page Button Clicked",
    },
    pageBtnAction: {
      action: "Page Button Clicked",
    },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  numberOfPages: 3,
  selectedPage: 2,
};
