import { useQuery } from '@tanstack/react-query';

import { IQueryOptions } from '@/shared/api/model';

import { ISource } from '../model';
import { SourceService } from '../service';

export const KEY_GET_SOURCES = 'getMySources';

export const useMySources = (options?: IQueryOptions<ISource[]>) =>
  useQuery({
    queryKey: [KEY_GET_SOURCES],
    queryFn: () => SourceService.getMySources(),
    ...options,
    staleTime: 1000 * 5 * 60,
  });
