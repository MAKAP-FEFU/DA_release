import React, { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useCurrentUser } from '@/shared/api/services/user/hooks/useCurrentUser';
import Spinner from '@/shared/ui/Spinner';

import Header from '../Header';

import styles from './Layout.module.css';

function Layout() {
  const { data: user, isError, isFetched } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if ((isFetched && (!user || isError)) || !localStorage.getItem('token')) navigate('/login');
  }, [user, navigate, isError, isFetched]);

  return (
    <div className={styles.app}>
      {user && (
        <React.Fragment>
          <Header username={user.username} />

          <div className={styles.content}>
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Layout;
