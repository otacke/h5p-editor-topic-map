import { ArrowDirection } from "./ArrowDirection";
import { ArrowType } from "./ArrowType";
import { Position } from "./Position";

export type ArrowSectionVM = {
  id: string;
  type: ArrowType;
  direction: ArrowDirection;
  start: Position;
  end: Position;
};
