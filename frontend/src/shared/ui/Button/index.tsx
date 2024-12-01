import clsx from 'clsx';
import { FC, MouseEvent, PropsWithChildren } from 'react';

import Spinner from '../Spinner';

import styles from './Button.module.css';

interface ButtonProps extends PropsWithChildren {
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit';
}

const Button: FC<ButtonProps> = ({
  disabled = false,
  isLoading = false,
  type = 'button',
  children,
  onClick,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(styles.root, className)}
      onClick={(e) => (onClick ? onClick(e) : null)}
      type={type}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
