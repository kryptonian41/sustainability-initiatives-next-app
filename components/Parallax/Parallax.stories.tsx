import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { parallaxProps } from "./mockProps";
import Parallax from ".";

export default {
  title: "Components/Parallax",
  component: Parallax,
  argTypes: {},
} as ComponentMeta<typeof Parallax>;

const Template: ComponentStory<typeof Parallax> = (args) => (
  <Parallax {...args} />
);

export const Dark = Template.bind({});
Dark.args = parallaxProps;

export const Light = Template.bind({});
Light.args = {
  ...parallaxProps,
  isLight: true,
};
