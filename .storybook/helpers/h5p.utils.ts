import { H5PFieldGroup, H5PForm } from "h5p-types";
import { ArrowType } from "../../src/types/ArrowType";
import { ColorTheme } from "../../src/types/ColorTheme";
import { Params } from "../../src/types/Params";

export const params: Params = {
  topicMapItems: [
    {
      heightPercentage: 100,
      widthPercentage: 100,
      id: "box-1",
      label: "Label 1",
      xPercentagePosition: 0,
      yPercentagePosition: 0,
      topicImage: { path: "", alt: "" },
      dialog: {
        hasNote: true,
        links: [
          { id: "link-1", label: "Example", url: "https://example.com" },
          { id: "link-2", label: "Example 2", url: "https://example.com/2" },
        ],
      },
      description: "",
    },
    {
      heightPercentage: 100,
      widthPercentage: 100,
      id: "box-2",
      label: "Label 2",
      xPercentagePosition: 0,
      yPercentagePosition: 0,
      topicImage: undefined,
      description: "",
    },
  ],
  arrowItems: [
    {
      id: "arrow-1",
      dialog: {
        hasNote: true,
        links: [
          { id: "link-3", label: "Example", url: "https://example.com" },
          { id: "link-4", label: "Example 2", url: "https://example.com/2" },
        ],
      },
      arrowType: ArrowType.Directional,
      startElementId: "box-1",
      endElementId: "box-2",
      label: "",
      startPosition: { x: 0, y: 0 },
      endPosition: { x: 0, y: 0 },
      startGridPosition: { x: 0, y: 0 },
      endGridPosition: { x: 0, y: 0 },
      breakpoints: [],
      relativeBreakpoints: [],
    },
  ],
  colorTheme: ColorTheme.Blue,
};

export const semantics: H5PFieldGroup = {
  label: "Topic map editor",
  name: "topicMap",
  type: "group",
  widget: "topicMap",
  importance: "high",
  fields: [
    {
      label: "Topic map items",
      name: "topicMapItems",
      type: "list",
      entity: "Topic map item",
      importance: "low",
      field: {
        label: "Item",
        name: "topicMapItem",
        importance: "low",
        type: "group",
        fields: [
          {
            name: "id",
            label: "Id",
            type: "text",
            widget: "none",
          },
          {
            name: "xPercentagePosition",
            label: "X-position as a percentage of the container width",
            type: "number",
            widget: "none",
          },
          {
            name: "yPercentagePosition",
            label: "Y-position as a percentage of the container height",
            type: "number",
            widget: "none",
          },
          {
            name: "widthPercentage",
            label: "Width as a percentage of the container width",
            type: "number",
            widget: "none",
          },
          {
            name: "heightPercentage",
            label: "Height as a percentage of the container height",
            type: "number",
            widget: "none",
          },
          {
            label: "Label",
            description: "The label is shown on top of the background image",
            name: "label",
            type: "text",
          },
          {
            label: "Description",
            description:
              "The description is shown on top of the background image, below the label",
            name: "description",
            type: "text",
            optional: true,
          },
          {
            label: "Topic image",
            description:
              "Background image for card and image above text in dialog",
            name: "topicImage",
            type: "image",
          },
          {
            label: "Topic image alt text",
            description:
              "Alternative text for the image that is used by screen readers",
            name: "topicImageAltText",
            type: "text",
            optional: true,
          },
          {
            label: "Dialog",
            name: "dialog",
            type: "group",
            fields: [
              {
                label: "Text",
                name: "text",
                type: "text",
                widget: "html",
                optional: true,
              },
              {
                label: "Video",
                name: "video",
                type: "video",
                optional: true,
              },
              {
                label: "Audio",
                name: "audio",
                type: "group",
                optional: true,
                importance: "low",
                fields: [
                  {
                    label: "Audio",
                    name: "audioFile",
                    type: "audio",
                  },
                  {
                    label: "Subtext",
                    name: "subtext",
                    type: "text",
                    widget: "html",
                    optional: true,
                  },
                ],
              },
              {
                label: "Links",
                name: "links",
                description:
                  "These links are as auxiliary links for the user in the element's modal window",
                type: "list",
                optional: true,
                entity: "linkItem",
                field: {
                  label: "Link",
                  name: "link",
                  type: "group",
                  fields: [
                    {
                      label: "Id",
                      name: "id",
                      type: "text",
                      widget: "uuid",
                    },
                    {
                      label: "Label",
                      name: "label",
                      type: "text",
                    },
                    {
                      label: "Url",
                      name: "url",
                      type: "text",
                    },
                  ],
                },
              },
            ],
          },
          {
            label: "Index",
            description:
              "⚠️ Advanced feature: Used for manually setting tab order.",
            name: "index",
            type: "number",
            optional: true,
          },
        ],
      },
    },
    {
      label: "Arrows",
      name: "arrowItems",
      type: "list",
      entity: "arrowItem",
      field: {
        label: "Arrow",
        name: "arrow",
        type: "group",
        fields: [
          {
            name: "id",
            label: "Id",
            type: "text",
            widget: "none",
          },
          {
            name: "startElementId",
            label: "Id of start element",
            type: "text",
            widget: "none",
          },
          {
            name: "endElementId",
            label: "Id of end element",
            type: "text",
            widget: "none",
          },
          {
            label: "Label",
            description:
              "The label is used by screen readers and on the summary page",
            name: "label",
            type: "text",
            widget: "none",
          },
          {
            label: "Description",
            description:
              "The description is shown on top of the background image, below the label",
            name: "description",
            type: "text",
            optional: true,
          },
          {
            label: "Topic image",
            description: "Image above text in dialog",
            name: "topicImage",
            type: "image",
          },
          {
            label: "Topic image alt text",
            description:
              "Alternative text for the image that is used by screen readers",
            name: "topicImageAltText",
            type: "text",
            optional: true,
          },
          {
            label: "Show start arrow-head",
            name: "showStartHead",
            type: "boolean",
            widget: "none",
            default: false,
          },
          {
            label: "Show end arrow-head",
            name: "showEndHead",
            type: "boolean",
            widget: "none",
            default: true,
          },
          {
            label: "Dialog",
            name: "dialog",
            type: "group",
            fields: [
              {
                label: "Text",
                name: "text",
                type: "text",
                widget: "html",
                optional: true,
              },
              {
                label: "Video",
                name: "video",
                type: "video",
                optional: true,
              },
              {
                label: "Audio",
                name: "audio",
                type: "group",
                optional: true,
                importance: "low",
                fields: [
                  {
                    label: "Audio",
                    name: "audioFile",
                    type: "audio",
                  },
                  {
                    label: "Subtext",
                    name: "subtext",
                    type: "text",
                    widget: "html",
                    optional: true,
                  },
                ],
              },
              {
                label: "Links",
                name: "links",
                description:
                  "These links are as auxiliary links for the user in the element's modal window",
                type: "list",
                optional: true,
                entity: "linkItem",
                field: {
                  label: "Link",
                  name: "link",
                  type: "group",
                  fields: [
                    {
                      label: "Id",
                      name: "id",
                      type: "text",
                      widget: "uuid",
                    },
                    {
                      label: "Label",
                      name: "label",
                      type: "text",
                    },
                    {
                      label: "Url",
                      name: "url",
                      type: "text",
                    },
                  ],
                },
              },
            ],
          },
          {
            label: "Index",
            name: "index",
            type: "number",
            optional: true,
            widget: "none",
          },
        ],
      },
    },
    {
      label: "Background image",
      name: "gridBackgroundImage",
      type: "image",
      optional: true,
    },
    {
      label: "Appearance",
      name: "appearance",
      type: "group",
      importance: "low",
      widget: "none",
      fields: [
        {
          label: "Color theme",
          name: "colorTheme",
          type: "select",
          default: ColorTheme.Blue,
          options: Object.entries(ColorTheme).map(([label, value]) => ({
            label,
            value,
          })),
        },
      ],
    },
  ],
};

export const parent: H5PForm = {
  params: {
    topicMap: {
      topicMapItems: [
        {
          id: "6133281e-7b52-408b-a66c-0878fd839ca4",
          xPercentagePosition: 15,
          yPercentagePosition: 8.333333333333332,
          widthPercentage: 20,
          heightPercentage: 33.33333333333335,
          topicImage: { path: "" },
          label: "",
          description: "",
        },
        {
          id: "461c2820-da07-43bb-8d14-a798c396fd7a",
          xPercentagePosition: 45,
          yPercentagePosition: 8.333333333333332,
          widthPercentage: 45,
          heightPercentage: 83.33333333333331,
          topicImage: { path: "" },
          label: "",
          description: "",
        },
        {
          id: "8123ecbf-d416-42a5-8106-47b440de51ec",
          xPercentagePosition: 15,
          yPercentagePosition: 50,
          widthPercentage: 20,
          heightPercentage: 25,
          topicImage: { path: "" },
          label: "",
          description: "",
        },
      ],
      arrowItems: [],
      colorTheme: ColorTheme.Blue,
    },
  },
  passReadies: false,
  commonFields: {},
  $form: null,
  $common: null,
  $commonButton: null,
  zebra: "odd",
  offset: { top: 59.234375, left: 0 },
  currentLibrary: "H5P.TopicMap 0.1",
  metadata: {
    license: "U",
    title: "Topic Map 3",
    authors: [],
    changes: [],
    extraTitle: "Topic Map 3",
  },
  metadataForm: null,
  children: [],
  readies: [],
  ready: (callback: () => void) => callback(),
  parent: null,
  addLanguages: langCode => {},
  removeLanguages: langCode => {},
};
