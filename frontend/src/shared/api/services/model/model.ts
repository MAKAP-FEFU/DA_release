export interface IModel {
  id: number;
  name: string;
  created_at: string;
}

export interface IDeleteModelsBody {
  ids: number[];
}

export interface IDeleteModelsResponse {
  message: string;
}

export interface ICreateModelBody {
  name: string;
  features: string;
}
