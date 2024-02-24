export class UpdateUserDto {
  public name?: string;
  public email?: string;
  public avatarUrl?: string | undefined;
  public password?: string;
  public accountType?: string;
  public favorites?: string[];
}
