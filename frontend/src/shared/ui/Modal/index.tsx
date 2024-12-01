import * as Dialog from '@radix-ui/react-dialog';
import { FC, ReactNode } from 'react';

import styles from './Modal.module.css';

type ModalProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const Modal: FC<ModalProps> = ({ title, children, open, onOpenChange }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={styles.dialogContent}>
        <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
