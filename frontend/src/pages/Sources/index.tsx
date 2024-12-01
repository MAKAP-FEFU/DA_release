import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Controls from '@/components/Controls';
import EntityRow from '@/components/EntityRow';
import { useCreateSource } from '@/shared/api/services/source/hooks/useCreateSource';
import { useDeleteSources } from '@/shared/api/services/source/hooks/useDeleteSources';
import { useMySources } from '@/shared/api/services/source/hooks/useMySources';
import { SourceDefaultValues } from '@/shared/constants';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import Text from '@/shared/ui/Text';

import styles from './Sources.module.css';

type CreateSourceFields = {
  name: string;
  features: string;
  url: string;
};

const SourcesPage = () => {
  const { data, refetch } = useMySources();
  const { mutateAsync: deleteModels } = useDeleteSources();
  const { mutateAsync: createSource } = useCreateSource();
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const { control, handleSubmit } = useForm<CreateSourceFields>({
    defaultValues: SourceDefaultValues,
  });
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleDelete = async (ids: number[]) => {
    deleteModels({ ids })
      .then(() => {
        refetch();
      })
      .finally(() => {
        setCheckedRows([]);
      });
  };

  const handleCreateSource: SubmitHandler<CreateSourceFields> = (fields) => {
    createSource({ ...fields, type: 'API' }).then(() => {
      setAddModalOpen(false);
      refetch();
    });
  };

  return (
    <div className={styles.root}>
      <Controls
        checked={checkedRows.length === data?.length}
        onCheckedChange={() =>
          setCheckedRows(
            checkedRows.length !== data?.length && data ? data?.map(({ id }) => id) : [],
          )
        }
        checkedCount={checkedRows.length}
        onDelete={() => handleDelete(checkedRows)}
        onAdd={() => setAddModalOpen(true)}
      />

      {data && data.length > 0 && (
        <div className={styles.models}>
          {data?.map(({ id, name, created_at }) => (
            <EntityRow
              entityName={name}
              dateCreated={created_at}
              onCheckedChange={(checked) =>
                setCheckedRows((prev) =>
                  checked ? [...prev, id] : prev.filter((item) => item !== id),
                )
              }
              checked={checkedRows.includes(id)}
              key={id}
              onEdit={() => null}
              onDelete={() => handleDelete([id])}
            />
          ))}
        </div>
      )}
      <Modal open={addModalOpen} onOpenChange={setAddModalOpen} title='Добавить ресурс'>
        <React.Fragment>
          <div className={styles.form}>
            <Text>Имя</Text>
            <Controller
              name='name'
              control={control}
              rules={{ required: 'Обязательное поле' }}
              render={({ field }) => <Input {...field} />}
            />
            <Text>URL</Text>
            <Controller
              name='url'
              control={control}
              rules={{ required: 'Обязательное поле' }}
              render={({ field }) => <Input {...field} />}
            />
            <Text>Модель</Text>
            <Controller
              name='features'
              control={control}
              rules={{ required: 'Обязательное поле' }}
              render={({ field }) => (
                <textarea value={field.value || ''} onChange={field.onChange} />
              )}
            />
          </div>
          <Button className={styles.create} onClick={handleSubmit(handleCreateSource)}>
            <Text>Создать</Text>
          </Button>
        </React.Fragment>
      </Modal>
    </div>
  );
};

export default SourcesPage;
