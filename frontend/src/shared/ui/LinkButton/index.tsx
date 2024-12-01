import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Text from '../Text';

import styles from './LinkButton.module.css';

export interface LinkButtonProps {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  variant?: '40' | '32' | '24' | '22' | '20' | '16';
  fontWeight?: '400' | '500' | '600' | '700';
}

const LinkButton: FC<LinkButtonProps> = ({
  href = '#',
  className,
  children,
  onClick,
  variant,
  fontWeight,
}) => {
  return (
    <Link className={styles.root} to={href} onClick={onClick}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text as='span' variant={variant} fontWeight={fontWeight} className={className}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Link>
  );
};

export default LinkButton;
