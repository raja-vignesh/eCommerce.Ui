export class ApiError extends Error {
  status: number;
  title: string;
  detail: string;
  errors: Record<string, string[]>;
  constructor(
    status: number,
    title: string,
    detail: string,
    errors: Record<string, string[]>,
  ) {
    super(detail ?? title);
    this.name = "ApiError";
    this.status = status;
    this.title = title;
    this.detail = detail;
    this.errors = errors;
  }
}
