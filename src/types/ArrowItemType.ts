import { ArrowDirection, ArrowType } from "../components/Arrow/Utils";
import { CommonItemType } from "./CommonItemType";

export type ArrowItemType = CommonItemType & {
  type: "arrow";

  /** The direction of the arrow's head */
  arrowDirection: ArrowDirection;

  /** The arrow type */
  arrowType: ArrowType;
};
