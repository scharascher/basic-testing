// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const URL = '/some-url-path';
const BASE_URL = 'https://jsonplaceholder.typicode.com';
describe('throttledGetDataFromApi', () => {
  const data = { a: 3 };
  let getMock: jest.Mocked<typeof axios>['get'];
  beforeEach(() => {
    getMock = jest.fn().mockResolvedValue({ data }) as jest.Mocked<
      typeof axios
    >['get'];
    mockedAxios.create.mockReturnValue({
      ...mockedAxios,
      get: (...args) => getMock(...args),
    } as jest.Mocked<typeof axios>);
  });
  afterEach(() => {
    mockedAxios.create.mockRestore();
    getMock.mockRestore();
  });
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(URL);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(URL);
    expect(getMock).toHaveBeenCalledWith(URL);
  });

  test('should return response data', async () => {
    expect(await throttledGetDataFromApi(URL)).toBe(data);
  });
});
