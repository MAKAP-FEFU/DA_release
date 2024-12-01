import { useMutation } from '@tanstack/react-query';

import { IMutationOptions } from '@/shared/api/model';

import { IDeleteConnectionBody, IDeleteConnectionResponse } from '../model';
import { ConnectionService } from '../service';

export const KEY_DELETE_CONNECTIONS = 'deleteConnections';

export const useDeleteConnections = (
  options?: IMutationOptions<IDeleteConnectionResponse, IDeleteConnectionBody>,
) =>
  useMutation({
    mutationKey: [KEY_DELETE_CONNECTIONS],
    mutationFn: (data) => ConnectionService.deleteConnections(data),
    ...options,
  });
