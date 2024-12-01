import { useQuery } from '@tanstack/react-query';

import { IQueryOptions } from '@/shared/api/model';

import { IConnection } from '../model';
import { ConnectionService } from '../service';

export const KEY_GET_CONNECTIONS = 'getMyConnections';

export const useMyConnections = (options?: IQueryOptions<IConnection[]>) =>
  useQuery({
    queryKey: [KEY_GET_CONNECTIONS],
    queryFn: () => ConnectionService.getMyConnections(),
    ...options,
    staleTime: 1000 * 5 * 60,
  });
