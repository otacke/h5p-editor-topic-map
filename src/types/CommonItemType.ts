import { Image } from "./h5p/Image";

export type CommonItemType = {
  id: string;

  description?: string | undefined;
  backgroundImage?: Image | undefined;
  dialog?: {
    links?: Array<string> | undefined;
    text?: string;
    video?: unknown;
  };
};
