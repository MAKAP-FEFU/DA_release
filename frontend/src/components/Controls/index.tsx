import { FC } from 'react';

import Button from '@/shared/ui/Button';
import Checkbox from '@/shared/ui/Checkbox';
import Input from '@/shared/ui/Input';

import PlusIcon from '@/assets/icons/plus.svg?svgr';
import TrashIcon from '@/assets/icons/trash.svg?svgr';

import styles from './Controls.module.css';

type ControlsProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onDelete: () => void;
  checkedCount?: number;
  onAdd?: () => void;
};

const Controls: FC<ControlsProps> = ({
  checked,
  onCheckedChange: setChecked,
  onDelete,
  checkedCount,
  onAdd,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <Button className={styles.delete} disabled={checkedCount === 0} onClick={onDelete}>
          <TrashIcon className={checkedCount === 0 ? styles.disabled : ''} />
        </Button>
        <Input hasError={false} hasIcon />
      </div>
      <Button className={styles.add} onClick={onAdd}>
        <PlusIcon />
      </Button>
    </div>
  );
};

export default Controls;
