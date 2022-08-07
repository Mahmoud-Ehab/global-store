export const getXById = (table: string, id: number) => ({
  name: 'get-by-id-from-table',
  text: `SELECT * FROM ${table} WHERE id = $1`,
  values: [id],
});
