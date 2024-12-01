export interface IConnection {
  id: number;
  name: string;
  last_connection?: string;
  source: {
    id: number;
    name: string;
  };
  model: {
    id: number;
    name: string;
  };
}

export interface IDeleteConnectionBody {
  ids: number[];
}

export interface IDeleteConnectionResponse {
  message: string;
}

export interface ICreateConnection {
  name: string;
  source_id: number;
  model_id: number;
}

export interface IConnectBody {
  connection_id: number;
  source_id: number;
  model_id: number;
}
