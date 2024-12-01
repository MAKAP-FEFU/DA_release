import { useMutation } from '@tanstack/react-query';

import { IMutationOptions } from '@/shared/api/model';

import { IConnection, ICreateConnection } from '../model';
import { ConnectionService } from '../service';

export const KEY_CREATE_CONNECTION = 'createConenction';

export const useCreateConnection = (options?: IMutationOptions<IConnection, ICreateConnection>) =>
  useMutation({
    mutationKey: [KEY_CREATE_CONNECTION],
    mutationFn: (data) => ConnectionService.createConnection(data),
    ...options,
  });
