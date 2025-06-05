export interface ISession {
  id: string;
  createdAt: string;
  projectId: string;
  environment: string | null;
}

export interface ISessionDTO extends Pick<ISession, 'projectId' | 'createdAt' | "id"> {
    environment: string;
}
