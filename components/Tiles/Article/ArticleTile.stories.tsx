import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleTile } from '.';
import ArticlePlaceHolderImage from '../../../assets/images/article-placeholder-image.png'
import { Button } from '../../Button'

export default {
  title: 'Components/ArticleTile',
  component: ArticleTile,
  argTypes: {
  },
} as ComponentMeta<typeof ArticleTile>;

const Template: ComponentStory<typeof ArticleTile> = (args) => {
  return <div className="w-1/3 m-auto">
    <ArticleTile {...args} />
  </div>
};

export const Primary = Template.bind({});
Primary.args = {
  imgUrl: ArticlePlaceHolderImage,
  title: 'DP for Pune and its implications on Punekars',
  subtitle: 'Posted On 21st January 2021',
  body: 'Sustainability Initiatives in association with Rostrum India Social Organization, Pune organised... ',
  actions: <Button type="outline">Read More</Button>
};
