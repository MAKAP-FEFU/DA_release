import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HeaderLinks } from '@/shared/constants';
import Button from '@/shared/ui/Button';
import LinkButton from '@/shared/ui/LinkButton';
import Text from '@/shared/ui/Text';

import LogoutIcon from '@/assets/icons/logout.svg?svgr';

import styles from './Header.module.css';

type HeaderProps = {
  username: string;
};

const Header: FC<HeaderProps> = ({ username }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.root}>
      <Text variant='20' className={styles.appName}>
        DataAPI
      </Text>
      <ul className={styles.links}>
        {HeaderLinks.map(({ name, href }) => (
          <li key={name}>
            <LinkButton
              variant='22'
              fontWeight={href === location.pathname ? '700' : '400'}
              href={href}
            >
              {name}
            </LinkButton>
          </li>
        ))}
      </ul>
      <div className={styles.user}>
        <Text className={styles.username}>{username}</Text>
        <Button className={styles.logout} onClick={handleLogout}>
          <LogoutIcon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
