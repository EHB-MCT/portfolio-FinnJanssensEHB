/**Types */
export type City = {
  cityNumber: number;
  description: string;
  entity?: number;
};

export type Stop = {
  stopNumber: number;
  description: string;
  entity: number;
  cityDescription: string;
};
