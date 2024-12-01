import { FC } from 'react';

import Button from '@/shared/ui/Button';
import Checkbox from '@/shared/ui/Checkbox';
import Popover from '@/shared/ui/Popover';
import Text from '@/shared/ui/Text';

import styles from './EntityRow.module.css';

type EntityRowProps = {
  entityName: string;
  dateCreated: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
};

const EntityRow: FC<EntityRowProps> = ({
  checked,
  onCheckedChange,
  onEdit,
  onDelete,
  entityName,
  dateCreated,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
        <div className={styles.info}>
          <Text variant='24'>{entityName}</Text>
          <Text variant='14' className={styles.date}>
            Добавлено: {dateCreated}
          </Text>
        </div>
      </div>
      <Popover>
        <div className={styles.actions}>
          <Button onClick={onEdit} className={styles.popoverButton}>
            Редактировать
          </Button>
          <Button onClick={onDelete} className={styles.popoverButton}>
            Удалить
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default EntityRow;
