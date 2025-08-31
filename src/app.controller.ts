import { Controller, Get, Post ,Query , ParseIntPipe, ParseFloatPipe, Param, Body} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('accounts')
  getUsers() 
  { return this.appService.getUsers();}

  @Get('accounts/:id')
  getUserById(@Param('id') id: number) 
    {return this.appService.getUserById(id);}

  @Post('accounts/register')
  createUser(
    @Body('name') name: string ,
    @Body('amount', ParseFloatPipe) amount: number
      ) {return this.appService.createUser(name, amount);}

  @Post('accounts/deposit')
  deposit(
    @Body('id', ParseIntPipe) id: number, 
    @Body('amount' , ParseIntPipe) amount: number
      ) { return this.appService.deposit(id, amount);}

  @Post('accounts/withdraw')
  withdraw(
    @Body('id', ParseIntPipe) id: number,
    @Body('amount', ParseIntPipe) amount: number
      ) { return this.appService.withdraw(id, amount);}

  @Post('accounts/transfer')
  transfer(
    @Query('sender', ParseIntPipe) sender: number,
    @Query('receiver', ParseIntPipe) receiver: number,
    @Query('amount', ParseFloatPipe) amount: number,
      ) { return this.appService.transfer(sender, receiver, amount);}

}
