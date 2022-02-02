import * as React from "react";
import { FC } from "react";
import Xarrow from "react-xarrows";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import styles from "./Arrow.module.scss";

export type ArrowProps = {
  cellSize: number;
  item: ArrowItemType;
  setSelectedItemId: (itemId: string) => void;
  onDoubleClick: () => void;
};

export const Arrow: FC<ArrowProps> = ({
  cellSize,
  item,
  setSelectedItemId,
  onDoubleClick,
}) => {
  const arrowBodyWidth = cellSize / 2.5;

  const arrowProps = {
    tabIndex: -1,
    onClick: () => setSelectedItemId(item.id),
    onDoubleClick,
    role: "button",
  };

  return (
    <div aria-label={item.label} className={`arrow-item ${styles.arrow}`}>
      <Xarrow
        start={item.startElementId}
        end={item.endElementId}
        path="grid"
        gridBreak={item.arrowType === ArrowType.Directional ? "0%" : undefined}
        showHead={[ArrowType.BiDirectional, ArrowType.Directional].includes(
          item.arrowType,
        )}
        showTail={[ArrowType.BiDirectional].includes(item.arrowType)}
        lineColor="var(--theme-color-2)"
        headColor="var(--theme-color-2)"
        tailColor="var(--theme-color-2)"
        strokeWidth={arrowBodyWidth}
        headSize={cellSize / 10}
        tailSize={cellSize / 10}
        zIndex={1}
        divContainerStyle={{
          pointerEvents: "auto",
        }}
        arrowHeadProps={{ ...arrowProps, style: { outline: "none" } }}
        arrowBodyProps={arrowProps}
      />
    </div>
  );
};
