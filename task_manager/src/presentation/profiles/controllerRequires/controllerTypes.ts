type ResponseType = {
  status: number;
  data: unknown;
};

type DataType = {
  userId: number;
  phone: string;
  bio: string;
};

export type { ResponseType, DataType };
