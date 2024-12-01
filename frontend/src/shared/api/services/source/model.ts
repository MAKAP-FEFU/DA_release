export interface ISource {
  id: number;
  name: string;
  created_at: string;
}

export interface IDeleteSourceBody {
  ids: number[];
}

export interface IDeleteSourcesResponse {
  message: string;
}

export interface ICreateSourceBody {
  name: string;
  url: string;
  features: string;
  type: string;
}
