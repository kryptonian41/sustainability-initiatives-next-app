import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Heading } from '.';

export default {
  title: 'Components/Heading',
  component: Heading,
  argTypes: {
  },
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'The people who make it possible'
};

export const WithActions = Template.bind({});
WithActions.args = {
  label: 'The people who make it possible',
  actions: <div>Actions</div>
};