// Uncomment the code below and write your tests
import fs from 'fs';
import promises from 'fs/promises';
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
jest.mock('fs');
jest.mock('fs/promises');
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(spy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(spy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(timeout * 2);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'pathToFile';
  afterAll(() => {
    jest.unmock('fs');
    jest.unmock('fs/promises');
  });
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(false);
    expect(await readFileAsynchronously('./index.test.ts')).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Some file content';
    const buffer = Buffer.from(fileContent, 'utf8');
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (promises.readFile as jest.Mock).mockResolvedValue(buffer);
    expect(await readFileAsynchronously(pathToFile)).toBe(fileContent);
  });
});
