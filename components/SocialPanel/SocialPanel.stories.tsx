import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SocialPanel } from '.';

export default {
  title: 'Components/Social Panel',
  component: SocialPanel,
  argTypes: {
    iconColor: {
      control: {
        type: 'color'
      }
    },
    backgroundColor: {
      control: {
        type: 'color'
      }
    },
  },
} as ComponentMeta<typeof SocialPanel>;

const Template: ComponentStory<typeof SocialPanel> = (args) => <SocialPanel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  iconColor: ''
};