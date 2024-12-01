import * as Select from '@radix-ui/react-select';
import { FC } from 'react';
import styles from "./Select.module.css"

type SelectProps = {
  items: {
    value: string;
    name: string;
  }[];
  value: string;
  onValueChange: (value: string) => void;
};

const SelectComponent: FC<SelectProps> = ({ items, value, onValueChange }) => (
  <div className={styles.root}>
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className={styles.trigger} >{items.find(el => el.value == value)?.name}</Select.Trigger>
      <Select.Content className={styles.content}>
        <Select.Viewport className={styles.Viewport}>
          {items.map((item) => (
            <Select.Item className={styles.item} key={item.value} value={item.value}>
              {item.name}
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>

    </Select.Root>
  </div>
);

export default SelectComponent;
