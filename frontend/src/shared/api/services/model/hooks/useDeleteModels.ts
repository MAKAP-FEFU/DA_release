import { useMutation } from '@tanstack/react-query';

import { IMutationOptions } from '@/shared/api/model';

import { IDeleteModelsBody, IDeleteModelsResponse } from '../model';
import { ModelService } from '../service';

export const KEY_DELETE_MODELS = 'deleteModels';

export const useDeleteModels = (
  options?: IMutationOptions<IDeleteModelsResponse, IDeleteModelsBody>,
) =>
  useMutation({
    mutationKey: [KEY_DELETE_MODELS],
    mutationFn: (data) => ModelService.deleteModels(data),
    ...options,
  });
