import { FC } from 'react';

import Button from '@/shared/ui/Button';
import Checkbox from '@/shared/ui/Checkbox';
import Popover from '@/shared/ui/Popover';
import Text from '@/shared/ui/Text';

import styles from './ConnectionRow.module.css';

type ConnectionRowProps = {
  connectionName: string;
  lastConnection?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  onConnect: () => void;
  source: {
    id: number;
    name: string;
  };
  model: {
    id: number;
    name: string;
  };
};

const ConnectionRow: FC<ConnectionRowProps> = ({
  checked,
  onCheckedChange,
  onEdit,
  onDelete,
  connectionName,
  lastConnection,
  onConnect,
  model,
  source,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
        <div className={styles.info}>
          <Text variant='24'>{connectionName}</Text>
          <Text variant='14' className={styles.date}>
            {lastConnection ? `Последнее подключение: ${lastConnection}` : 'Новое подключение'}
          </Text>
        </div>
        <div className={styles.info}>
          <Text variant='16'>{model.name}</Text>
          <Text variant='16'>{source.name}</Text>
        </div>
      </div>
      <div className={styles.controls}>
        <Button className={styles.connect} onClick={onConnect}>
          <Text variant='20'>Подключиться</Text>
        </Button>
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
    </div>
  );
};

export default ConnectionRow;
