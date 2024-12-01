import { useQuery } from '@tanstack/react-query';

import { IQueryOptions } from '@/shared/api/model';

import { IUser } from '../model';
import { UserService } from '../service';

export const KEY_GET_CURRENT_USER = 'getCurrentUser';

export const useCurrentUser = (options?: IQueryOptions<IUser>) =>
  useQuery({
    queryKey: [KEY_GET_CURRENT_USER],
    queryFn: () => UserService.getCurrentUser(),
    ...options,
    staleTime: 1000 * 5 * 60,
  });
