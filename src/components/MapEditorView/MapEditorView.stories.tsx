/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import {
  params,
  parent,
  semantics,
} from "../../../.storybook/helpers/h5p.utils";
import { ArrowItemType } from "../../types/ArrowItemType";
import { Params } from "../../types/Params";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { MapEditorView } from "./MapEditorView";

export default {
  title: "Templates/Map Editor View",
  component: MapEditorView,
  args: {
    setParams: (newParams: Params) =>
      // eslint-disable-next-line no-console
      console.debug("Params updated", { newParams }),
    semantics,
    params,
    parent,
  },
} as ComponentMeta<typeof MapEditorView>;

const Template: ComponentStory<typeof MapEditorView> = args => (
  <div style={{ width: "918px" }}>
    <MapEditorView {...args} />
  </div>
);

export const Empty = Template.bind({});
Empty.args = {
  params: {
    ...params,
    topicMapItems: [],
    arrowItems: [],
  },
};

const withItemsItems: Array<TopicMapItemType> = [
  {
    id: "box-1",
    xPercentagePosition: 0,
    yPercentagePosition: 0,
    widthPercentage: 15,
    heightPercentage: 20,
    topicImage: {
      path: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=770&q=80",
      alt: "",
    },
    label: "Label 1",
    description: "",
  },
  {
    id: "box-2",
    xPercentagePosition: 5,
    yPercentagePosition: 30,
    widthPercentage: 30,
    heightPercentage: 60,
    topicImage: {
      path: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
      alt: "",
    },
    label: "Label 2",
    description:
      "Let's put some highlights on these little trees. The sun wouldn't forget them. I will take some magic white, and a little bit of Vandyke brown and a little touch of yellow. Didn't you know you had that much power? You can move mountains. You can do anything.",
  },
  {
    id: "box-3",
    xPercentagePosition: 50,
    yPercentagePosition: 30,
    widthPercentage: 20,
    heightPercentage: 40,
    topicImage: {
      path: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80",
      alt: "",
    },
    label: "Label 3",
    description:
      "You can do anything here - the only pre-requisite is that it makes you happy.",
  },
];

const withItemsArrows: Array<ArrowItemType> = [];

export const WithItems = Template.bind({});
WithItems.args = {
  params: {
    ...params,
    topicMapItems: withItemsItems,
    arrowItems: withItemsArrows,
  },
};

const TemplateFullscreen: ComponentStory<typeof MapEditorView> = args => (
  <MapEditorView {...args} />
);

export const FullscreenEmpty = TemplateFullscreen.bind({});
FullscreenEmpty.args = {
  params: {
    ...params,
    topicMapItems: [],
    arrowItems: [],
  },
};

export const FullscreenWithItems = TemplateFullscreen.bind({});
FullscreenWithItems.args = {
  params: {
    ...params,
    topicMapItems: [
      {
        id: "box-4",
        xPercentagePosition: 0,
        yPercentagePosition: 0,
        widthPercentage: 15,
        heightPercentage: 20,
        topicImage: {
          path: "https://images.unsplash.com/photo-1601242453944-421cde7cfc84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          alt: "",
        },
        label: "Label 1",
        description: "",
      },
      {
        id: "box-5",
        xPercentagePosition: 5,
        yPercentagePosition: 30,
        widthPercentage: 30,
        heightPercentage: 60,
        topicImage: {
          path: "https://images.unsplash.com/photo-1596985122625-faf96c53e0c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
          alt: "",
        },
        label: "Label 2",
        description:
          "Let's put some highlights on these little trees. The sun wouldn't forget them. I will take some magic white, and a little bit of Vandyke brown and a little touch of yellow. Didn't you know you had that much power? You can move mountains. You can do anything.",
      },
      {
        id: "box-6",
        xPercentagePosition: 50,
        yPercentagePosition: 30,
        widthPercentage: 20,
        heightPercentage: 50,
        topicImage: {
          path: "https://images.unsplash.com/photo-1598328514034-58f20ba7d2d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
          alt: "",
        },
        label: "Label 3",
        description:
          "You can do anything here - the only pre-requisite is that it makes you happy.",
      },
    ],
    arrowItems: [],
  },
};
