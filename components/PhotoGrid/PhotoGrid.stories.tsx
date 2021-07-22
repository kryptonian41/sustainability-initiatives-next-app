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
