import { useMutation } from '@tanstack/react-query';

import { IMutationOptions } from '@/shared/api/model';

import { IConnectBody } from '../model';
import { ConnectionService } from '../service';

export const KEY_CONNECT = 'connect';

export const useConnect = (options?: IMutationOptions<Record<string, string>, IConnectBody>) =>
  useMutation({
    mutationKey: [KEY_CONNECT],
    mutationFn: (data) => ConnectionService.connect(data),
    ...options,
  });
