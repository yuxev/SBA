import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  const mockService = {
    getUsers: jest.fn().mockReturnValue([
      { id: 1, name: 'John Doe', amount: 1000 },
    ]),
    getUserById: jest.fn().mockImplementation((id: number) => ({
      id,
      name: `User ${id}`,
      amount: 100 * id,
    })),
    createUser: jest.fn().mockImplementation((name: string, amount: number) => ({
      id: 99,
      name,
      amount,
    })),
    deposit: jest.fn().mockImplementation((id: number, amount: number) => ({
      id,
      amount: 1000 + amount,
    })),
    withdraw: jest.fn().mockImplementation((id: number, amount: number) => ({
      id,
      amount: 1000 - amount,
    })),
    transfer: jest.fn().mockImplementation((from: number, to: number, amount: number) => ({
      fromUser: { id: from, amount: 1000 - amount },
      toUser: { id: to, amount: 500 + amount },
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockService }],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should return users from getUsers', () => {
    const users = appController.getUsers();
    expect(users).toEqual([{ id: 1, name: 'John Doe', amount: 1000 }]);
    expect(mockService.getUsers).toHaveBeenCalled();
  });

  it('should return a user for getUserById and call service with numeric id', () => {
    const result = appController.getUserById(2 as any);
    expect(result).toEqual({ id: 2, name: 'User 2', amount: 200 });
    expect(mockService.getUserById).toHaveBeenCalledWith(2);
  });

  it('should create a user via createUser', () => {
    const created = appController.createUser('New', 123.45);
    expect(created).toEqual({ id: 99, name: 'New', amount: 123.45 });
    expect(mockService.createUser).toHaveBeenCalledWith('New', 123.45);
  });

  it('should deposit and return updated user', () => {
    const res = appController.deposit(1 as any, 50 as any);
    expect(res).toEqual({ id: 1, amount: 1050 });
    expect(mockService.deposit).toHaveBeenCalledWith(1, 50);
  });

  it('should withdraw and return updated user', () => {
    const res = appController.withdraw(1 as any, 30 as any);
    expect(res).toEqual({ id: 1, amount: 970 });
    expect(mockService.withdraw).toHaveBeenCalledWith(1, 30);
  });

  it('should transfer and return from/to users', () => {
    const res = appController.transfer(1 as any, 3 as any, 25 as any);
    expect(res).toEqual({
      fromUser: { id: 1, amount: 975 },
      toUser: { id: 3, amount: 525 },
    });
    expect(mockService.transfer).toHaveBeenCalledWith(1, 3, 25);
  });
});
