import { useMutation } from '@tanstack/react-query';

import { IMutationOptions } from '@/shared/api/model';

import { ICreateSourceBody, ISource } from '../model';
import { SourceService } from '../service';

export const KEY_CREATE_SOURCE = 'createSource';

export const useCreateSource = (options?: IMutationOptions<ISource, ICreateSourceBody>) =>
  useMutation({
    mutationKey: [KEY_CREATE_SOURCE],
    mutationFn: (data) => SourceService.createSource(data),
    ...options,
  });
