import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PhotoGrid from ".";
import { peopleProps } from "./mockProps";

export default {
  title: "Components/PhotoGrid",
  component: PhotoGrid,
  argTypes: {},
} as ComponentMeta<typeof PhotoGrid>;

const Template: ComponentStory<typeof PhotoGrid> = (args) => (
  <PhotoGrid {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  people: peopleProps,
};

export const WithBg = Template.bind({});
WithBg.args = {
  people: peopleProps,
  darkBg: true,
};

export const WithAction = Template.bind({});
WithAction.args = {
  people: peopleProps,
  withAction: true,
};
