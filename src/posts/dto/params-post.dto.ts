export class ParamsPostDto {
  readonly limit?: number;
  readonly page?: number;
  readonly orderBy?: string;
  readonly searchBy?: string;
  readonly categoryId?: number;
  readonly tagBy?: number;
  readonly userId?: number;
  readonly favorites?: boolean;
  readonly isShort?: boolean;
}
