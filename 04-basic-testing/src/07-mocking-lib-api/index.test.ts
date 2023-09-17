// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const providedBaseURL = 'https://jsonplaceholder.typicode.com';
  const providedRelativePath = '/albums/1';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.runOnlyPendingTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockedCreate = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(providedRelativePath);

    expect(mockedCreate).lastCalledWith({ baseURL: providedBaseURL });
  });

  test('should perform request to correct provided url', async () => {
    const mockedGet = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(providedRelativePath);

    expect(mockedGet).lastCalledWith(providedRelativePath);
  });

  test('should return response data', async () => {
    const expected = { userId: 1, id: 1, title: 'quidem molestiae enim' };
    expect(throttledGetDataFromApi(providedRelativePath)).resolves.toEqual(
      expected,
    );
  });
});
