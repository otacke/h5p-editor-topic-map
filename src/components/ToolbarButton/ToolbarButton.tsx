import * as React from "react";
import styles from "./ToolbarButton.module.scss";
import { Icon } from "../Icons/Icons";
import { ToolbarButtonType } from "../Toolbar/Toolbar";
import { TranslationKey } from "../../types/TranslationKey";
import { useT } from "../../hooks/useH5PTranslation";

export type ToolbarButtonProps = {
  icon: ToolbarButtonType;
  labelKey: TranslationKey;
  onClick: React.MouseEventHandler;
  showActive: boolean;
  active: boolean;
  isDisabled: boolean;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  labelKey,
  onClick,
  showActive,
  active,
  isDisabled,
}) => {
  const label = useT(labelKey);
  
  return (
    <button
      type="button"
      className={
        active && showActive
          ? `${styles.toolbarButton} ${styles.active}`
          : styles.toolbarButton
      }
      disabled={isDisabled}
      onClick={onClick}
      aria-label={label}
    >
      <Icon icon={icon} className={styles.icon} />
      <div className={styles.tooltip}>{label}</div>
    </button>
  );
};
