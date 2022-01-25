import * as React from "react";
import styles from "./ContextMenuButton.module.scss";
import { Icon } from "../Icons/Icons";
import { ContextMenuButtonType } from "../ContextMenu/ContextMenu";
import { TranslationKey } from "../../types/TranslationKey";
import { useT } from "../../hooks/useH5PTranslation";

export type ContextMenuButtonProps = {
  icon: ContextMenuButtonType;
  labelKey: TranslationKey;
  onClick: React.MouseEventHandler;
};

export const ContextMenuButton: React.FC<ContextMenuButtonProps> = ({
  icon,
  labelKey,
  onClick,
}) => {
  const label = useT(labelKey);

  return (
    <button
      type="button"
      className={styles.contextMenuButton}
      onClick={onClick}
      aria-label={label}
    >
      <Icon icon={icon} className={styles.icon} />
      <div className={styles.tooltip}>{label}</div>
    </button>
  );
};
