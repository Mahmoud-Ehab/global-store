export type Endpoint = {
  path: (...params: any) => string;
  appPath: string;
  type: 'GET' | 'POST' | 'DELETE' | 'PATCH';
}