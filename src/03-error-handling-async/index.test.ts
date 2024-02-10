// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('x')).toBe('x');
    await expect(resolveValue({})).resolves.toEqual({});
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'message';
    expect(() => throwError(message)).toThrowError(message);
    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
    expect(throwError).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
    expect(throwCustomError).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    try {
      await rejectCustomError();
    } catch (e: unknown) {
      expect(e instanceof MyAwesomeError).toBe(true);
      if (e instanceof MyAwesomeError) {
        expect(e.message).toBe('This is my awesome custom error!');
      }
    }
  });
});
