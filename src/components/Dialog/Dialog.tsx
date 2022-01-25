import * as React from "react";
import {
  Root,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./Dialog.module.scss";
import { TranslationKey } from "../../types/TranslationKey";
import { useT } from "../../hooks/useH5PTranslation";

export type DialogProps = {
  isOpen: boolean;
  titleKey: TranslationKey;
  description?: string | undefined;
  onOpenChange: (open: boolean) => void;
};

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  titleKey,
  description,
  onOpenChange,
  children,
}) => {
  const title = useT(titleKey);
  const closeButtonLabel = useT("dialog_close");

  return (
    <Root open={isOpen} onOpenChange={onOpenChange}>
      <Overlay className={styles.overlay} />
      <Content className={styles.content}>
        <Title className={styles.title}>{title}</Title>
        {description && <Description>{description}</Description>}
        <Close className={styles.closeButton} aria-label={closeButtonLabel}>
          <Cross2Icon />
        </Close>
        {children}
      </Content>
    </Root>
  );
};
