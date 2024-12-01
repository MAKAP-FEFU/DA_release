import { useMutation } from '@tanstack/react-query';

import { IMutationOptions } from '@/shared/api/model';

import { ILoginBody, ILoginResponse } from '../model';
import { UserService } from '../service';

export const KEY_REGISTER = 'register';

export const useRegister = (options?: IMutationOptions<ILoginResponse, ILoginBody>) =>
  useMutation({
    mutationKey: [KEY_REGISTER],
    mutationFn: (data) =>
      UserService.register(data).then((res) => {
        localStorage.setItem('token', res.token);
        return res;
      }),
    ...options,
  });
