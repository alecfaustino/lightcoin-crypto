

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let bal = 0;
    for(const transcation of this.transactions) {
      bal += transcation.value;
    }
    return bal;
  }

  addTransaction(transcation) {
    this.transactions.push(transcation);
  }
}
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }


  commit() {
    if(!this.isAllowed()) {
      console.log('Withdrawall is not allowed: Insufficient Funds');
      return
    }
    this.time = new Date();
    this.account.addTransaction(this)
  }
}
class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }
  isAllowed() {
    if (this.amount > this.account.balance) {
      return false
    }
    return true;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log('Starting Balance', myAccount.balance)
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

// t2 = new Withdrawal(9.99, myAccount);
// t2.commit();
// console.log('Transaction 2:', t2);

// t3 = new Deposit(120.00, myAccount);
// t3.commit();
// console.log('Transaction 3:', t3);

console.log('Ending Balance:', myAccount.balance);
