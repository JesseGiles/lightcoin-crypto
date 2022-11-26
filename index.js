class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];

   }

  get balance() { // Calculate the balance using the transaction objects.
    let balance = 0;
    for (let each of this.transactions) {
      balance += each.value;
    } return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit(){
    if (!this.confirmTransaction()) {
    return console.log(`Insufficient Funds! Current balance: ${this.account.balance}. Withdrawl requested: ${this.amount}`);
    }
    this.time = new Date(); // Keep track of the time of the transaction
    this.account.addTransaction(this); // Add the transaction to the account
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
   return -this.amount;
  }

  confirmTransaction() {
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  confirmTransaction() {
    return true; // deposits always allowed
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("richie rich's account");

console.log('Starting balance: ', myAccount.balance)

t1 = new Deposit(120.00, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(50.25, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Withdrawal(9.99, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

t4 = new Withdrawal(200, myAccount);
t4.commit();
console.log('Transaction 4:', t4);

console.log('New Balance: ', myAccount.balance)
