import type { ApiPostMethods, IApi } from "../../types";

export class Api implements IApi {
  readonly baseUrl: string;
  protected options: RequestInit;

  constructor(baseUrl: string, options: RequestInit = {}) {
    this.baseUrl = baseUrl;
    this.options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...((options.headers as Record<string, string> | undefined) ?? {}),
      },
    };
  }

  protected async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json().catch(() => null);
    if (response.ok) return data as T;

    const message =
      data && typeof data === "object" && "error" in data
        ? String(data.error)
        : response.statusText || `HTTP ${response.status}`;
    throw new Error(message);
  }

  get<T extends object>(uri: string): Promise<T> {
    return fetch(this.baseUrl + uri, {
      ...this.options,
      method: "GET",
    }).then((response) => this.handleResponse<T>(response));
  }

  post<T extends object>(
    uri: string,
    data: object,
    method: ApiPostMethods = "POST",
  ): Promise<T> {
    return fetch(this.baseUrl + uri, {
      ...this.options,
      method,
      body: JSON.stringify(data),
    }).then((response) => this.handleResponse<T>(response));
  }
}
