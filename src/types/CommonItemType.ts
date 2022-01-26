import { DialogContent } from "./DialogContent";
import { Image } from "./H5P/Image";

export type CommonItemType = {
  id: string;
  label: string;

  description?: string;
  topicImage?: Image;
} & (
  | {
      dialogOrDirectLink: "dialog";
      dialog?: DialogContent;
    }
  | {
      dialogOrDirectLink: "directLink";
      directLink?: string;
    }
);
