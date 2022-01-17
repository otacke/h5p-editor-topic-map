import * as React from "react";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowType } from "../../types/ArrowType";
import { Position } from "../../types/Position";
import { Size } from "../../types/Size";
import {
  ArrowBody,
  ArrowBodyVertical,
  ArrowHead,
  ArrowHeadVertical,
  MirroredArrowHead,
  MirroredArrowHeadVertical,
} from "../ArrowParts/ArrowParts";
import styles from "./ArrowSection.module.scss";

export type ArrowSectionProps = {
  start: Position;
  end: Position;
  type: ArrowType;
  direction: ArrowDirection;
  cellSize: number;
  gapSize: number;
};

const directionClassNames = {
  [ArrowDirection.Up]: styles.pointUp,
  [ArrowDirection.Down]: styles.pointDown,
  [ArrowDirection.Left]: styles.pointLeft,
  [ArrowDirection.Right]: styles.pointRight,
} as const;

// TODO: Share code with h5p-topic-map instead of duplicating
export const ArrowSection: React.FC<ArrowSectionProps> = ({
  start,
  end,
  type,
  direction,
  cellSize,
  gapSize,
}) => {
  const isHorizontal =
    direction === ArrowDirection.Left || direction === ArrowDirection.Right;

  const classNames = `${styles.arrow} ${directionClassNames[direction]}`;

  const transform = `translateX(${start.x}px) translateY(${start.y}px)
     `;

     console.log({start,end,type,direction,})
     
  const style: Size = isHorizontal
    ? {
        width: Math.abs(end.x - start.x),
        height: cellSize + gapSize,
      }
    : {
        height: Math.abs(end.y - start.y),
        width: cellSize + gapSize,
      };
      
  let arrowSection: JSX.Element;
  switch (type) {
    case ArrowType.NonDirectional:
      arrowSection = (
        <div data-testid="ndArrow" className={classNames} style={style}>
          {isHorizontal ? <ArrowBody /> : <ArrowBodyVertical />}
        </div>
      );
      break;

    case ArrowType.BiDirectional:
      arrowSection = (
        <div data-testid="bdArrow" className={classNames} style={style}>
          {isHorizontal ? (
            <>
              <MirroredArrowHead />
              <ArrowBody />
              <ArrowHead />
            </>
          ) : (
            <>
              <MirroredArrowHeadVertical />
              <ArrowBodyVertical />
              <ArrowHeadVertical />
            </>
          )}
        </div>
      );
      break;

    case ArrowType.Directional:
      arrowSection = (
        <div data-testid="dArrow" className={classNames} style={style}>
          {isHorizontal ? (
            <>
              <ArrowBody />
              <ArrowHead />
            </>
          ) : (
            <>
              <ArrowBodyVertical />
              <ArrowHeadVertical />
            </>
          )}
        </div>
      );
  }

  return (
    <div className={styles.arrowSection} style={{ transform }}>
      {arrowSection}
    </div>
  );
};
