import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import ConnectionRow from '@/components/ConnectionRow';
import Controls from '@/components/Controls';
import { useConnect } from '@/shared/api/services/connection/hooks/useConnect';
import { useCreateConnection } from '@/shared/api/services/connection/hooks/useCreateConnection';
import { useDeleteConnections } from '@/shared/api/services/connection/hooks/useDeleteConnections';
import { useMyConnections } from '@/shared/api/services/connection/hooks/useMyConnections';
import { useMyModels } from '@/shared/api/services/model/hooks/useMyModels';
import { useMySources } from '@/shared/api/services/source/hooks/useMySources';
import { ConnectionDefaultValues } from '@/shared/constants';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import Select from '@/shared/ui/Select';
import Text from '@/shared/ui/Text';

import styles from './Connections.module.css';

type ConnectionFields = {
  name: string;
  source_id: string;
  model_id: string;
};

const SourcesPage = () => {
  const { data, refetch } = useMyConnections();
  const { mutateAsync: createConnection } = useCreateConnection();
  const { mutateAsync: connect } = useConnect();
  const { mutateAsync: deleteModels } = useDeleteConnections();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { data: models } = useMyModels();
  const { data: sources } = useMySources();
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const { control, handleSubmit } = useForm<ConnectionFields>({
    defaultValues: ConnectionDefaultValues,
  });
  const [resultObject, setResultObject] = useState<Record<string, string> | null>(null)
  const [resultModalOpen, setResultModalOpen] = useState(false)

  const handleDelete = async (ids: number[]) => {
    deleteModels({ ids })
      .then(() => {
        refetch();
      })
      .finally(() => {
        setCheckedRows([]);
      });
  };

  const handleSubmitConnection: SubmitHandler<ConnectionFields> = async (fields) => {
    await createConnection({
      name: fields.name,
      source_id: Number(fields.source_id),
      model_id: Number(fields.model_id),
    }).then(() => {
      setAddModalOpen(false);
      refetch();
    });

  };

  const handleConnect = (source_id: number, model_id: number, connection_id: number) => {
    connect({ source_id, model_id, connection_id }).then(data => {
      setResultObject(data)
      setResultModalOpen(true)
    })
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
          {data?.map(({ id, name, last_connection, source, model }) => (
            <ConnectionRow
              connectionName={name}
              lastConnection={last_connection}
              onCheckedChange={(checked) =>
                setCheckedRows((prev) =>
                  checked ? [...prev, id] : prev.filter((item) => item !== id),
                )
              }
              checked={checkedRows.includes(id)}
              key={id}
              onEdit={() => null}
              onDelete={() => handleDelete([id])}
              onConnect={() => handleConnect(source.id, model.id, id)}
              source={source}
              model={model}
            />
          ))}
        </div>
      )}
      <Modal open={addModalOpen} onOpenChange={setAddModalOpen} title='Добавить подключение'>
        <React.Fragment>
          <div className={styles.form}>
            <Text>Имя</Text>
            <Controller
              name='name'
              control={control}
              rules={{ required: 'Обязательное поле' }}
              render={({ field }) => <Input {...field} />}
            />
            <Text>Модель</Text>
            <Controller
              name='model_id'
              control={control}
              rules={{ required: 'Обязательное поле' }}
              render={({ field }) => (
                <Select
                  items={models?.map(({ id, name }) => ({ value: String(id), name })) || []}
                  value={field.value || ''}
                  onValueChange={field.onChange}
                />
              )}
            />
            <Text>Источник</Text>
            <Controller
              name='source_id'
              control={control}
              rules={{ required: 'Обязательное поле' }}
              render={({ field }) => (
                <Select
                  items={sources?.map(({ id, name }) => ({ value: String(id), name })) || []}
                  value={field.value || ''}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
          <Button className={styles.create} onClick={handleSubmit(handleSubmitConnection)}>
            <Text>Создать</Text>
          </Button>
        </React.Fragment>
      </Modal>
      <Modal open={resultModalOpen} onOpenChange={setResultModalOpen} title='Результат'>
        <div>
          {<div><pre>{JSON.stringify(resultObject, null, 2)}</pre></div>}
        </div>
      </Modal>
    </div>
  );
};

export default SourcesPage;
