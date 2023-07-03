// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const dummy = () => void 0;
const providedTimeout = 1500;

describe('doStuffByTimeout', () => {
  let spyTimeout: jest.SpyInstance;

  beforeEach(() => {
    spyTimeout = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(dummy, providedTimeout);
    expect(spyTimeout).toBeCalledWith(dummy, providedTimeout);
  });

  test('should call callback only after timeout', () => {
    const providedCallback = jest.fn(dummy);

    doStuffByTimeout(providedCallback, providedTimeout);

    expect(providedCallback).not.toBeCalled();

    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let spyInterval: jest.SpyInstance;

  beforeEach(() => {
    spyInterval = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(dummy, providedTimeout);
    expect(spyInterval).toBeCalledWith(dummy, providedTimeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const providedCallback = jest.fn(dummy);

    doStuffByInterval(providedCallback, providedTimeout);

    expect(providedCallback).not.toBeCalled();

    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(3);

    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(4);

    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const mockedFilePath = 'kek.md';
  const mockedFileContent = 'dummy file content';
  let mockedJoin: jest.SpyInstance;
  let mockedExistsSync: jest.SpyInstance;
  let mockedReadFile;

  beforeEach(() => {
    mockedJoin = jest.spyOn(path, 'join');

    mockedExistsSync = jest.spyOn(fs, 'existsSync');
    mockedExistsSync.mockReturnValue(false);

    mockedReadFile = jest.spyOn(fs.promises, 'readFile');
    mockedReadFile.mockResolvedValue(mockedFileContent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockedFilePath);

    expect(mockedJoin).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    await expect(readFileAsynchronously(mockedFilePath)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockedExistsSync.mockReturnValueOnce(true);

    await expect(readFileAsynchronously(mockedFilePath)).resolves.toBe(
      mockedFileContent,
    );
  });
});
