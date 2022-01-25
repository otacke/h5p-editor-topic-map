/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ContextMenu, ContextMenuButtonType } from "./ContextMenu";

export default {
  title: "Molecules/ContextMenu",
  component: ContextMenu,
  args: {
    show: true,
    actions: [
      {
        icon: ContextMenuButtonType.Edit,
        labelKey: "context-menu_edit",
        // eslint-disable-next-line no-alert
        onClick: () => alert("Edit"),
      },
      {
        icon: ContextMenuButtonType.Delete,
        labelKey: "context-menu_delete",
        // eslint-disable-next-line no-alert
        onClick: () => alert("Delete"),
      },
    ],
  },
} as ComponentMeta<typeof ContextMenu>;

const Template: ComponentStory<typeof ContextMenu> = args => (
  <div
    style={{
      position: "absolute",
      left: "0px",
      top: "0px",
      transform: "translate(10%, 10%) translate(16px, 80px)",
      display: "inline-flex",
    }}
  >
    <ContextMenu {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};

export const ManyActions = Template.bind({});
ManyActions.args = {
  actions: [
    {
      icon: ContextMenuButtonType.Edit,
      labelKey: "context-menu_edit",
      // eslint-disable-next-line no-alert
      onClick: () => alert("Edit"),
    },
    {
      icon: ContextMenuButtonType.ArrowDirectional,
      labelKey: "context-menu_arrow-directional",
      // eslint-disable-next-line no-alert
      onClick: () => alert("Directional arrow"),
    },

    {
      icon: ContextMenuButtonType.ArrowBiDirectional,
      labelKey: "context-menu_arrow-bi-directional",
      // eslint-disable-next-line no-alert
      onClick: () => alert("Bi-directional arrow"),
    },

    {
      icon: ContextMenuButtonType.ArrowNonDirectional,
      labelKey: "context-menu_arrow-non-directional",
      // eslint-disable-next-line no-alert
      onClick: () => alert("Arrow without direction"),
    },
    {
      icon: ContextMenuButtonType.Delete,
      labelKey: "context-menu_delete",
      // eslint-disable-next-line no-alert
      onClick: () => alert("Delete"),
    },
  ],
};
