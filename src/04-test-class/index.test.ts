// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

import lodash from 'lodash';

describe('BankAccount', () => {
  const initialBalance = 9000;
  let mainAccount: BankAccount;
  let secondAccount: BankAccount;
  let operationAmount: number;

  beforeEach(() => {
    mainAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(mainAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    operationAmount = initialBalance * 2;

    expect(() => mainAccount.withdraw(operationAmount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    secondAccount = getBankAccount(initialBalance);
    operationAmount = initialBalance * 2;

    expect(() =>
      mainAccount.transfer(operationAmount, secondAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    operationAmount = initialBalance * 0.5;

    expect(() =>
      mainAccount.transfer(operationAmount, mainAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    operationAmount = initialBalance * 0.5;
    const expectedBalance = initialBalance + operationAmount;

    mainAccount.deposit(operationAmount);
    expect(mainAccount.getBalance()).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    operationAmount = initialBalance * 0.5;
    const expectedBalance = initialBalance - operationAmount;

    mainAccount.withdraw(operationAmount);
    expect(mainAccount.getBalance()).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    secondAccount = getBankAccount(initialBalance);
    operationAmount = initialBalance * 0.5;

    const expectedMainBalance = initialBalance - operationAmount;
    const expectedSecondBalance = initialBalance + operationAmount;

    mainAccount.transfer(operationAmount, secondAccount);

    expect(mainAccount.getBalance()).toBe(expectedMainBalance);
    expect(secondAccount.getBalance()).toBe(expectedSecondBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 88;

    const spyRandom = jest.spyOn(lodash, 'random');
    spyRandom.mockReturnValueOnce(balance);
    spyRandom.mockReturnValueOnce(1);

    const fetchedBalance = await mainAccount.fetchBalance();

    expect(typeof fetchedBalance).toBe('number');
    expect(fetchedBalance).toBe(balance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 88;

    const spyFetchBalance = jest.spyOn(mainAccount, 'fetchBalance');
    spyFetchBalance.mockResolvedValueOnce(balance);

    expect(mainAccount.getBalance()).toBe(initialBalance);
    await mainAccount.synchronizeBalance();
    expect(mainAccount.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const spyFetchBalance = jest.spyOn(mainAccount, 'fetchBalance');
    spyFetchBalance.mockResolvedValueOnce(null);

    await expect(mainAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
