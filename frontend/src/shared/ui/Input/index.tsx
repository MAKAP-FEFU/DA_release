import clsx from 'clsx';
import { forwardRef } from 'react';

import Text from '@/shared/ui/Text';

import GlassIcon from '@/assets/icons/glass.svg?svgr';

import styles from './Input.module.css';

type InputProps = {
  className?: string;
  hasError?: boolean;
  hasIcon?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, value, onChange, placeholder, hasError = true, hasIcon = false }, ref) => {
    return (
      <div className={styles.root}>
        <input
          className={clsx(className, styles.input)}
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {hasIcon && <GlassIcon className={styles.icon} />}
        {hasError && (
          <Text className={clsx(styles.error, { [styles.visibleError]: !!error })}>{error}</Text>
        )}
      </div>
    );
  },
);

export default Input;
