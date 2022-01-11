import * as React from "react";
import { ArrowType } from "../../types/ArrowType";
import { Position } from "../../types/Position";
import {
  createArrowSections,
  createSectionComponents,
} from "../../utils/arrow.utils";
import { ArrowSection } from "../ArrowSection/ArrowSection";

export type ArrowProps = {
  positions: Array<Position>;
  type: ArrowType;
  cellSize: number;
  gapSize: number;
};

export const Arrow: React.FC<ArrowProps> = ({
  positions,
  type,
  cellSize,
  gapSize,
}) => {
  const sections = createArrowSections(positions);
  const sectionComponents = React.useMemo(
    () => createSectionComponents(sections, type),
    [sections, type],
  );

  return (
    <div>
      {sectionComponents.map(
        ({ type: componentType, direction, start, end }) => (
          <ArrowSection
            type={componentType}
            direction={direction}
            start={start}
            end={end}
            cellSize={cellSize}
            gapSize={gapSize}
          />
        ),
      )}
    </div>
  );
};
