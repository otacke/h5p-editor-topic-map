import type { CommonItemType } from "./CommonItemType";
import type { Image } from "./h5p/Image";

export type TopicMapItemType = CommonItemType & {
  type: "topic-map-item";
  description?: string | undefined;
  backgroundImage?: Image | undefined;
};
