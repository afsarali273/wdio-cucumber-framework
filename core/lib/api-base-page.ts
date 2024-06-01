import axios, {AxiosInstance, AxiosResponse} from 'axios';

export class ApiBasePage{

  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  /**
   * Method to make a GET request.
   *
   * @param {string} url The URL to which the GET request is made.
   * @param {object} [config] Optional configuration for the request.
   * @param {object} [config.headers] Optional headers for the request.
   * @param {object} [config.params] Optional query parameters for the request.
   * @protected
   * @example
   *   Example usage:
   *   Without config:
   *   const response = await this.get('/endpoint');
   *   With config:
   *   const config = {
   *     headers: {
   *       'Content-Type': 'application/json',
   *       'Authorization': 'Bearer ' + token
   *     },
   *     params: {
   *       'key1': 'value1',
   *       'key2': 'value2'
   *     }
   *   };
   *   const response = await this.get('/endpoint', config);
   */
  protected async get(url: string, config?: any): Promise<AxiosResponse>{
    return this.axiosInstance.get(url, config);
  }

  protected async post(url: string, data?: any, config?: any): Promise<AxiosResponse> {
    return this.axiosInstance.post(url, data, config);
  }

  protected async put(url: string, data?: any, config?: any): Promise<AxiosResponse> {
    return this.axiosInstance.put(url, data, config);
  }

  protected async delete(url: string, config?: any): Promise<AxiosResponse> {
    return this.axiosInstance.delete(url, config);
  }


}

export class QueryParameterBuilder {
  private readonly params: { [key: string]: string | number };

  constructor() {
    this.params = {};
  }

  /**
   * Add a query parameter.
   *
   * @param {string} key The key of the query parameter.
   * @param {string | number} value The value of the query parameter.
   * @returns {QueryParameterBuilder} The QueryParameterBuilder instance for method chaining.
   */
  add(key: string, value: string | number): QueryParameterBuilder {
    this.params[key] = value.toString();
    return this;
  }

  /**
   * Build the query parameters string.
   *
   * @returns {string} The query parameters string.
   */
  build(): string {
    const queryParams = Object.keys(this.params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(this.params[key])}`)
      .join('&');
    return queryParams ? `?${queryParams}` : '';
  }
}

