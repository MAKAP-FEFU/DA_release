import { useQuery } from '@tanstack/react-query';

import { IQueryOptions } from '@/shared/api/model';

import { IModel } from '../model';
import { ModelService } from '../service';

export const KEY_GET_MODELS = 'getMyModels';

export const useMyModels = (options?: IQueryOptions<IModel[]>) =>
  useQuery({
    queryKey: [KEY_GET_MODELS],
    queryFn: () => ModelService.getMyModels(),
    ...options,
    staleTime: 1000 * 5 * 60,
  });
