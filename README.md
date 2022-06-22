# WALLET SYSTEM

Create a server that:
- allows admin 
    - to register Users
    - to create wallets 
    - to manage Users authentication
- allows Users 
    - to manage wallets
    - to open wallets 
    - to close wallets 
    ## WALLET MANAGEMENT  
    - to make transfers 
    - to make deposits/withdrawals
    - to get Transaction history

## Banking Entities
- Admin
- User
- Wallet
- Transaction

### USERS
- UserId
- UserName **firstName* **lastName*
- email
- password
- wallets


#### WALLET
- walletId
- currencyName
##### LINKED WALLET
- userId
- amount

##### TRANSACTION
- type: “deposit” | “withdrawal” | “transfer”
- details: Deposit | Withdrawal | Transfer

##### DEPOSIT DETAILS
- depositId (string)
- destination -> walletId
- dateOfTransaction
- amount

##### WITHDRAW DETAILS
- withdrawId (string)
- source -> walletId
- dateOfTransaction
- amount

##### TRANSFER DETAILS
- transferId (string)
- walletId(sender) ->  walletId(receiver)
- dateOfTransaction
- amount
........................................................................................................................................................................................................................................
## ROUTES
- RESTFUL-API  *** PUT GET POST DELETE
### Auth
- POST /auth/users
Request
    email: string;
    password: string;
Response
    status: string;
    data: Object
        token: string;

- POST /auth/users/login
Request
    email: string;
    password: string;
Response
    status: string;
    data: Object
        token: string;

### Wallets
- POST /wallets
Request
    currency: string;
Response
    status: string;
    data: Wallet;

- GET /wallets
Response
    status: string;
    data: Wallet[];

- GET /wallets/:id
Response
    status: string;
    data: Wallet;

DELETE /wallets/:id
Response
    status: string;

### Deposits
- POST /wallets/:id/deposits
Request
    amount: number;
Response
    status: string;
    data: Wallet;

- GET /wallets/:id/deposits
Response
    status: string;
    data: Deposit[];

- GET /wallets/:wallet_id/deposits/:id
Response
    status: string;
    data: Deposit;

### Withdrawals
- POST /wallets/:id/withdrawals
Request
    amount: number;
Response
    status: string;
    data: Wallet;

- GET /wallets/:id/withdrawals
Response
    status: string;
    data: Withdrawal[];

- GET /wallets/:wallet_id/withdrawals/:id
Response
    status: string;
    data: Withdrawal;

### Transfers
- POST /wallets/:id/transfers
Request
    destination: Wallets.id;
Response
    status: string;
    data: Wallet;

- GET /wallets/:id/transfers
Response
    status: string;
    data: Transfer[];

- GET /wallets/:wallet_id/transfers/:id
Response
    status: string;
    data: Transfer;

### Transactions
- GET /wallets/:wallet_id/transactions
Response
    status: string;
    data: Transaction;

- GET /wallets/:wallet_id/transactions/download
Response: should initiate a file download

### Extra features:
- Users can download their transaction history as a PDF.
- API DOCUMENTATION 
