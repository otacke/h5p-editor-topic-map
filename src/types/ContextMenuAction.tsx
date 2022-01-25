import * as React from "react";
import { ContextMenuButtonType } from "../components/ContextMenu/ContextMenu";
import { TranslationKey } from "./TranslationKey";

export type ContextMenuAction = {
  icon: ContextMenuButtonType;
  onClick: React.MouseEventHandler;
  labelKey: TranslationKey;
};
