import { ApiBasePage } from '../../../core/lib/api-base-page.ts';

export class SampleApi extends ApiBasePage{

  private readonly postEndpoint = '/posts/1';
  //private baseApi: BaseApi;
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor() {
    super();
    //this.baseApi = new BaseApi(); // TODO: Create a BaseClass for API url configuration using test-config.json file
    //this.baseUrl = this.baseApi.getServiceUrl(API_KEY).url;
  }

  async getPost() {
    return this.get(`${this.baseUrl}${this.postEndpoint}`);
  }

}