import { useMutation } from '@tanstack/react-query';

import { IMutationOptions } from '@/shared/api/model';

import { ILoginBody, ILoginResponse } from '../model';
import { UserService } from '../service';

export const KEY_lOGIN = 'login';

export const useLogin = (options?: IMutationOptions<ILoginResponse, ILoginBody>) =>
  useMutation({
    mutationKey: [KEY_lOGIN],
    mutationFn: (data) =>
      UserService.login(data).then((res) => {
        localStorage.setItem('token', res.token);
        return res;
      }),
    ...options,
  });
