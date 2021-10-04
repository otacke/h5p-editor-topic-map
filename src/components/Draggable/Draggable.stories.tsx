/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Draggable } from "./Draggable";

export default {
  title: "Molecules/Draggable",
  component: Draggable,
  args: {
    updatePosition: newPos => console.info("New position", newPos),
    initialXPosition: 200,
    initialYPosition: 200,
    height: 100,
    width: 100,
    gapSize: 10,
    gridIndicatorSize: 10,
    gridSize: {
      width: 200,
      height: 100,
    },
    initialHeight: 45,
    initialWidth: 95,
    id: "1",
    occupiedCells: [],
  },
} as ComponentMeta<typeof Draggable>;

const Template: ComponentStory<typeof Draggable> = args => (
  <Draggable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
