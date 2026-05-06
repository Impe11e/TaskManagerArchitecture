type ResponseType = {
  status: number;
  data: unknown;
};

type ProfileDataType = {
  userId?: number;
  phone?: string;
  bio?: string;
};

export type { ResponseType, ProfileDataType };
