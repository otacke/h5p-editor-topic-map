import * as React from "react";
import { useT } from "../../hooks/useH5PTranslation";
import styles from "./GridIndicator.module.scss";

export type GridIndicatorProps = {
  onMouseDown: (index: number) => void;
  onMouseEnter: (index: number) => void;
  index: number;
  active: boolean;
};

export const GridIndicator: React.FC<GridIndicatorProps> = ({
  onMouseDown,
  onMouseEnter,
  index,
  active,
}) => {
  const label = useT("grid-indicator_label");
  return (
    <button
      type="button"
      className={`grid-indicator ${styles.gridIndicator} ${
        active && styles.active
      }`}
      onMouseDown={() => onMouseDown(index)}
      onMouseEnter={() => onMouseEnter(index)}
      onTouchStart={() => onMouseDown(index)}
      onTouchMove={() => onMouseEnter(index)}
      aria-label={label}
    />
  );
};
