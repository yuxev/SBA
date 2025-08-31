import { Injectable , NotFoundException , BadRequestException} from '@nestjs/common';

@Injectable()
export class AppService {
  private users = {
    1: { id: 1, name: 'John Doe', amount: 1000},
    2: { id: 2, name: 'Jane Smith', amount: 2150},
    3: { id: 3, name: 'Alice Johnson', amount: 423},
    4: { id: 4, name: 'Bob Brown', amount: 4000},
  };

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    console.log('Fetching user with ID:', id);
    console.log(this.users[id]);
    const user = this.users[id];
      if (!user)
        throw new NotFoundException('User not found');
      else if (id <= 0)
        throw new BadRequestException('ID must be a positive integer');
    return  user;
  }

  createUser(name: string , amount: number) {
    const id = Object.keys(this.users).length + 1;
    if (amount < 0)
      throw new BadRequestException('Initial amount must be non-negative');
    else if (!name || name.trim() === '')
      throw new BadRequestException('Name is required');
    this.users[id] = { id, name, amount };
    return this.users[id];
  }

  deposit(id: number, amount: number) {
    const user = this.getUserById(id);
    user.amount += amount;
    return user;
  }

  withdraw(id: number, amount: number) {
    const user = this.getUserById(id);
    if (user.amount < amount) {
      throw new BadRequestException('Insufficient funds');
    }
    user.amount -= amount;
    return user;
  }

  transfer(fromId: number, toId: number, amount: number) {
    const fromUser = this.getUserById(fromId);
    const toUser = this.getUserById(toId);
    if (fromUser.amount < amount)
      throw new BadRequestException('Insufficient funds');
    else if (fromId === toId)
      throw new BadRequestException('Cannot transfer to the same account');
    else if (amount <= 0)
      throw new BadRequestException('Transfer amount must be positive'); 
    fromUser.amount -= amount;
    toUser.amount += amount;
    return { fromUser, toUser };
  }
}
