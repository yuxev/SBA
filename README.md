# Simple Banking API

A REST API built with NestJS to simulate basic banking operations. This project is for learning NestJS concepts like controllers, services, modules, dependency injection, and exception handling.

## Features

- Create accounts
- View account details
- Deposit money
- Withdraw money
- Transfer money between accounts
- Error handling with HTTP exceptions

## API Endpoints

### Create Account
`POST /accounts`
- Creates a new account with balance 0.
- Response: `{ "id": 1, "balance": 0 }`

### Get Account
`GET /accounts/:id`
- Returns account details.
- Response: `{ "id": 1, "balance": 100 }`

### Deposit
`POST /transactions/deposit`
- Body: `{ "accountId": 1, "amount": 50 }`
- Deposits money into the account.

### Withdraw
`POST /transactions/withdraw`
- Body: `{ "accountId": 1, "amount": 20 }`
- Withdraws money from the account.

### Transfer
`POST /transactions/transfer?sender=senderID&receiver=receiverID&amount=626`
- Transfers money between accounts.

## ⚠️ Error Handling

This project uses NestJS exceptions to return proper HTTP errors:

- `404 Not Found` → Account doesn’t exist  
- `400 Bad Request` →  
  - Deposit/withdraw amount ≤ 0  
  - Insufficient funds  
  - Invalid transfer (e.g., same account)

Example response:

```json
{
  "statusCode": 400,
  "message": "Insufficient funds",
  "error": "Bad Request"
}
