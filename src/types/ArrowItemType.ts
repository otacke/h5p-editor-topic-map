import { ArrowDirection } from "./ArrowDirection";
import { ArrowType } from "./ArrowType";
import { CommonItemType } from "./CommonItemType";
import { PositionDAO } from "./dao/PositionDAO";

export type ArrowItemType = CommonItemType & {
  /** The direction of the arrow's head */
  arrowDirection: ArrowDirection;

  /** The arrow type */
  arrowType: ArrowType;

  positions: Array<PositionDAO>;
};
