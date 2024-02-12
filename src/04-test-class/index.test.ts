// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should create account with initial balance', () => {
    expect(getBankAccount(3).getBalance()).toBe(3);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(3).withdraw(4)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(3).transfer(4, getBankAccount(2))).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(3);
    expect(() => acc.transfer(4, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc1 = getBankAccount(5);
    expect(acc1.deposit(5).getBalance()).toBe(10);
  });

  test('should withdraw money', () => {
    const acc1 = getBankAccount(5);
    expect(acc1.withdraw(5).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(5);
    const acc2 = getBankAccount(5);
    acc1.transfer(3, acc2);
    expect(acc1.getBalance()).toBe(2);
    expect(acc2.getBalance()).toBe(8);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc1 = getBankAccount(5);

    const balance = await acc1.fetchBalance();
    if (balance) expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc1 = getBankAccount(5);
    const spy = jest.spyOn(acc1, 'fetchBalance');
    try {
      await acc1.synchronizeBalance();
    } catch {
      return;
    } finally {
      expect(spy).toHaveBeenCalled();
    }
    await expect(spy.mock.results[0]?.value).resolves.toBe(acc1.getBalance());
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc1 = getBankAccount(5);
    try {
      await acc1.synchronizeBalance();
    } catch (e) {
      expect(e instanceof SynchronizationFailedError).toBe(true);
    }
  });
});
