export interface Entity<KEY, VALUE extends object, CACHE extends object> {
  key: KEY;
  value: VALUE;
  cache: CACHE;
}
