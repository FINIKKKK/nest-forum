export class SearchQuestionDto {
  readonly limit?: number;
  readonly page?: number;
  readonly orderBy?: string;
  readonly tagBy?: string;
  readonly userId?: number;
  readonly search?: string;
}