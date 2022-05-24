# WALLET SYSTEM

Create a server that:
- allows admin 
    - to register Users
    - to create wallets
    - to manage Users account
- allows Users 
    - to manage accounts/balances
    - to register for wallets 
    - to close down wallets 
    - to make transfers 
    - to make deposits/withdrawals
    - to get Transaction history
- allows Easy Wallet Management
    - Users easily control the flow of transactions 

## Banking Entities
- Admin
- User
- Wallet
- Deposit
- Withdraw
- Transfer

### USERS
- UserId
- firstname
- lastname
- email
- walletIds

#### WALLET
- walletId
- walletName
- currencyName
- balance
- transactionHistory

##### DEPOSIT
- depositId
- destination -> walletId
- dateOfTransaction
- amount

##### WITHDRAW
- withdrawId
- source -> walletId
- dateOfTransaction
- amount

##### TRANSFER
- transferId 
- walletId(receiver) -> walletId(receiver)
- dateOfTransaction
- amount

## ROUTES
User
- /

Wallet
- /

## AUTHENTICATION 
-   
-   

## DOCUMENTATION OF API  
-   
-   

## RESTFUL API 
- GET PUT POST PATCH DELETE