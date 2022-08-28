export type Endpoint = {
  path: (...params: any) => string;
  expressPath: string;
  type: 'GET' | 'POST' | 'DELETE' | 'PATCH';
}