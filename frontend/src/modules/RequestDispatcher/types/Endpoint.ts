// Should be typical to the one in the backend
export type Endpoint = {
  path: (...params: any) => string;
  expressPath: string;
  type: 'GET' | 'POST' | 'DELETE' | 'PATCH';
}
