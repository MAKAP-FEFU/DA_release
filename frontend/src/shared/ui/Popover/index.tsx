import * as PopoverPrimitive from '@radix-ui/react-popover';
import { FC } from 'react';

import Button from '../Button';

import DotsIcon from '@/assets/icons/dots.svg?svgr';

import styles from './Popover.module.css';

type PopoverProps = {
  children: React.ReactNode;
  className?: string;
};

const Popover: FC<PopoverProps> = ({ children }) => (
  <PopoverPrimitive.Root>
    <PopoverPrimitive.Trigger className={styles.trigger}>
      <Button className={styles.iconButton}>
        <DotsIcon />
      </Button>
    </PopoverPrimitive.Trigger>

    <PopoverPrimitive.Content className={styles.content} sideOffset={5}>
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Root>
);

export default Popover;
