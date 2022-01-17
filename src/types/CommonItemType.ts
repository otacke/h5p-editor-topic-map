import { Image } from "./h5p/Image";

export type CommonItemType = {
  id: string;

  dialog?: {
    links?: Array<string> | undefined;
    text?: string;
    video?: unknown;
  };
};
