import type { CommonItemType } from "./CommonItemType";
import type { Image } from "./h5p/Image";

export type TopicMapItemType = CommonItemType & {
  label: string;
  description?: string | undefined;

  /** The x position as a percentage of the container's width */
  xPercentagePosition: number;

  /** The y position as a percentage of the container's height */
  yPercentagePosition: number;

  /** The width as a percentage of the container's width */
  widthPercentage: number;

  /** The height as a percentage of the container's height */
  heightPercentage: number;

  backgroundImage?: Image | undefined;
};
