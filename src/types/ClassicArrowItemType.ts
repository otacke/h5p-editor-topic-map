import { ArrowType } from "./ArrowType";
import { ArrowDirection } from "./ArrowDirection";
import { CommonItemType } from "./CommonItemType";
import { Position } from "./Position";

export type ArrowItemType = CommonItemType & {
  /**
   * This index is used for manually sort the items' tab order
   * Arrow item indeces will only be set by the program - not the user
   */
  index?: number;

  /** The direction of the arrow's head */
  arrowDirection: ArrowDirection;

  /** The arrow type */
  arrowType: ArrowType;

  startElementId: string;
  endElementId: string;
  startPosition: Position;
  endPosition: Position;
  startGridPosition: Position;
  endGridPosition: Position;
};
