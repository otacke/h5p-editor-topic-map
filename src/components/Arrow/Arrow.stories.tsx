/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Arrow } from "./Arrow";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowType } from "../../types/ArrowType";

export default {
  title: "Organisms/Arrow",
  component: Arrow,
  argTypes: {
    type: {
      options: {
        Directional: ArrowType.Directional,
        "Bi-directional": ArrowType.BiDirectional,
        "Non-directional": ArrowType.NonDirectional,
      },
      control: { type: "radio" },
    },
  },
  args: {
    cellSize: 30,
    gapSize: 15,
  },
} as ComponentMeta<typeof Arrow>;

const Template: ComponentStory<typeof Arrow> = args => <Arrow {...args} />;

export const RightDirectionalEmptyArrow = Template.bind({});
RightDirectionalEmptyArrow.args = {
  positions: [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
  ],
  type: ArrowType.Directional,
};

export const LeftDirectionalCompletedArrow = Template.bind({});
LeftDirectionalCompletedArrow.args = {
  positions: [
    { x: 100, y: 0 },
    { x: 0, y: 0 },
  ],
  type: ArrowType.Directional,
};

export const BidirectionalHorizontalEmptyArrow = Template.bind({});
BidirectionalHorizontalEmptyArrow.args = {
  positions: [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
  ],
  type: ArrowType.BiDirectional,
};

export const UpDirectionalEditedArrow = Template.bind({});
UpDirectionalEditedArrow.args = {
  positions: [
    { x: 0, y: 100 },
    { x: 0, y: 0 },
  ],
  type: ArrowType.Directional,
};

export const NonDirectionalVerticalEmptyArrow = Template.bind({});
NonDirectionalVerticalEmptyArrow.args = {
  positions: [
    { x: 0, y: 100 },
    { x: 0, y: 0 },
  ],
  type: ArrowType.NonDirectional,
};

export const BentDirectionalArrow = Template.bind({});
BentDirectionalArrow.args = {
  positions: [
    { x: 0, y: 0 },
    { x: 0, y: 100 },
    { y: 100, x: 100 },
  ],
  type: ArrowType.Directional,
};

export const BentBiDirectionalArrow = Template.bind({});
BentBiDirectionalArrow.args = {
  positions: [
    { x: 0, y: 0 },
    { x: 0, y: 100 },
    { y: 100, x: 100 },
  ],
  type: ArrowType.BiDirectional,
};

export const BentNonDirectionalArrow = Template.bind({});
BentNonDirectionalArrow.args = {
  positions: [
    { x: 0, y: 0 },
    { x: 0, y: 100 },
    { y: 100, x: 100 },
  ],
  type: ArrowType.NonDirectional,
};
