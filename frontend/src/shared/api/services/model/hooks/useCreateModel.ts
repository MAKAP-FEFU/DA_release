import { useMutation } from '@tanstack/react-query';

import { IMutationOptions } from '@/shared/api/model';

import { ICreateModelBody, IModel } from '../model';
import { ModelService } from '../service';

export const KEY_CREATE_MODEL = 'createModel';

export const useCreateModel = (options?: IMutationOptions<IModel, ICreateModelBody>) =>
  useMutation({
    mutationKey: [KEY_CREATE_MODEL],
    mutationFn: (data) => ModelService.createModel(data),
    ...options,
  });
