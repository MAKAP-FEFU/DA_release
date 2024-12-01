import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useRegister } from '@/shared/api/services/user/hooks/useRegister';
import { LoginDefaultValues } from '@/shared/constants';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import LinkButton from '@/shared/ui/LinkButton';
import Text from '@/shared/ui/Text';

import styles from './Register.module.css';

type LoginFormFields = {
  username: string;
  password: string;
};

const RegisterPage = () => {
  const { control, handleSubmit, setError } = useForm<LoginFormFields>({
    defaultValues: LoginDefaultValues,
  });
  const navigate = useNavigate();
  const { mutateAsync: mutate } = useRegister();

  const onSubmit: SubmitHandler<LoginFormFields> = (fields, e) => {
    e?.preventDefault();
    mutate(fields)
      .then((data) => {
        if (!data) return;
        navigate('/models');
      })
      .catch((e) => {
        Object.entries(e.response.data.message).forEach(([key, value]) => {
          setError(key as keyof LoginFormFields, {
            message: value as string,
          });
        });
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Text as='h1' fontWeight='700' variant='40' className={styles.title}>
          Регистрация
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name='username'
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field, fieldState }) => (
              <Input placeholder='Логин' error={fieldState.error?.message} {...field} />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field, fieldState }) => (
              <Input placeholder='Пароль' error={fieldState.error?.message} {...field} />
            )}
          />
          <Button type='submit' className={styles.button}>
            <Text variant='28'>Зарегистрироваться</Text>
          </Button>
        </form>
        <Text fontWeight='400' variant='22' className={styles.register}>
          Уже есть аккаунт?{' '}
          <LinkButton href='/login' variant='22' fontWeight='600' className={styles.link}>
            Войти
          </LinkButton>
        </Text>
      </div>
    </div>
  );
};

export default RegisterPage;
