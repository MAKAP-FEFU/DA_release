import * as CheckboxPrivitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { FC } from 'react';

import styles from './Checkbox.module.css';

type CheckboxProps = {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const Checkbox: FC<CheckboxProps> = ({ id = '', checked, onCheckedChange }) => (
  <CheckboxPrivitive.Root
    className={styles.root}
    id={id}
    checked={checked}
    onCheckedChange={onCheckedChange}
  >
    <CheckboxPrivitive.Indicator className={styles.indicator}>
      <CheckIcon width={35} height={35} />
    </CheckboxPrivitive.Indicator>
  </CheckboxPrivitive.Root>
);

export default Checkbox;
