class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      //Apply the result of the transaction if validation succeeds
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
      return true;
    }
    else {
      //Otherwise, fail and return false to the caller
      return false;
    }
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    //Deposits are always permitted
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    //return true/false based on if the transaction would overdraft the account
    return (this.account.balance - this.amount >= 0);
  }
}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  
  get balance() {
    let bal = 0
    this.transactions.forEach(entry => bal += entry.value);
    return bal;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
//add a starting balance
t0 = new Deposit(500.00, myAccount);
t0.commit();

console.log('Balance:', myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log('Balance:', myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);
console.log('Balance:', myAccount.balance);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);
console.log('Balance:', myAccount.balance);

//Test checking for a withdrawal larger than the current balance
t4 = new Withdrawal(1000.00, myAccount);
t4.commit();
console.log('Transaction 4:', t4);
console.log('Balance:', myAccount.balance);
