import { useMutation } from '@tanstack/react-query';

import { IMutationOptions } from '@/shared/api/model';

import { IDeleteSourceBody, IDeleteSourcesResponse } from '../model';
import { SourceService } from '../service';

export const KEY_DELETE_SOURCES = 'deleteSources';

export const useDeleteSources = (
  options?: IMutationOptions<IDeleteSourcesResponse, IDeleteSourceBody>,
) =>
  useMutation({
    mutationKey: [KEY_DELETE_SOURCES],
    mutationFn: (data) => SourceService.deleteSources(data),
    ...options,
  });
