import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const baseRequestHeader = {
  "X-Tablelink-Service": "BE",
  "Accept-Language": "id",
};

const baseHeader: AxiosRequestConfig["headers"] = {
  ...baseRequestHeader,
  "Content-type": "application/json",
};

const defaultOptions: AxiosRequestConfig = {
  timeout: 30 * 1000,
};
export class BaseService {
  private mergeConfig(options: AxiosRequestConfig = {}): AxiosRequestConfig {
    return {
      ...defaultOptions,
      ...options,
      headers: {
        ...baseHeader,
        ...options.headers,
      },
    };
  }

  async _get<T>(
    url: string,
    params: object | null = null,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>["data"]> {
    try {
      const response: AxiosResponse = await axios.get<T>(url, {
        ...this.mergeConfig(options),
        params,
      });

      const data = response.data;
      return {
        ...data,
        meta: {
          ...data.meta,
          has_next: data.meta?.page < data.meta?.total_pages,
        },
      };
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data?.message ?? e.message);
      }
      throw e;
    }
  }
}
