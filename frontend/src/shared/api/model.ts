import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface PaginationParams {
  limit?: number;
  offset: number;
}

export type IBasicResponseError = AxiosError<{
  error?: string;
}>;

export type IQueryOptions<T> = Omit<
  UseQueryOptions<T, IBasicResponseError>,
  "queryKey" | "queryFn"
>;

export type IInfiniteQueryOptions<T, E = IBasicResponseError> = Omit<
  UseInfiniteQueryOptions<T, AxiosError<E>, InfiniteData<T>>,
  | "queryKey"
  | "queryFn"
  | "getPreviousPageParam"
  | "getNextPageParam"
  | "initialPageParam"
>;

export type IMutationOptions<T, D = void> = Omit<
  UseMutationOptions<T, IBasicResponseError, D>,
  "mutationKey" | "mutationFn"
>;

export interface IPaginationParams {
  offset?: number;
  limit?: number;
}

export interface IPaginationParamsWithOrder extends IPaginationParams {
  order_by?: "created_asc" | "created_desc";
}
