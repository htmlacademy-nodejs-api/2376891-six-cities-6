export function getMongoURI(
  username: string | undefined,
  password: string | undefined,
  host: string | undefined,
  port: string | undefined,
  databaseName: string | undefined,
): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
