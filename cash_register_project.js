const STATUS = {
    closed: 'CLOSED', 
    insufficientFunds: 'INSUFFICIENT_FUNDS', 
    open: 'OPEN'
};

const CURRENCY = [
    {name: "PENNY", value: 0.01},
    {name: "NICKEL", value: 0.05},
    {name: "DIME", value: 0.10},
    {name: "QUARTER", value: 0.25},
    {name: "ONE", value: 1.00},
    {name: "FIVE", value: 5.00},
    {name: "TEN", value: 10.00},
    {name: "TWENTY", value: 20.00},
    {name: "ONE HUNDRED", value: 100.00}
  ];

function checkCashRegister(price, cash, cid) {
    let cashRegister = {status: '', change: []};
    
    let changeInDrawer = cid.slice(0);

    const totalChange = (cash - price).toFixed(2);
    
    let changeNeeded = (cash - price).toFixed(2);

    let changeAvailable = cid.reduce((acc, val) => {
        return acc += val[1];
    }, 0).toFixed(2);

    for (let i = cid.length - 1; i >= 0; i--) {
        let currencyAmount = (cid[i][1] / CURRENCY[i]['value']).toFixed(2);
        let currencyToReturn = 0;

        while (changeNeeded >= CURRENCY[i]['value'] && currencyAmount > 0) {
            changeNeeded = (changeNeeded - CURRENCY[i]['value']).toFixed(2);
            currencyAmount--;
            currencyToReturn++;
        }

        if (currencyToReturn > 0) {
            cashRegister.change.push([CURRENCY[i]['name'], currencyToReturn * CURRENCY[i]['value']]);
        }
        
        if (changeNeeded > 0 && currencyAmount <= 0) {
            cashRegister.status = STATUS.insufficientFunds;
        }

        else {
            cashRegister.status = STATUS.open;
        } 
    }

    if (totalChange === changeAvailable) {
        cashRegister.status = STATUS.closed;
    }

    if (cashRegister.status == STATUS.insufficientFunds) {
        cashRegister.change = [];
    }

    if (cashRegister.status === STATUS.closed) {
        cashRegister.change = changeInDrawer;
    } 

    return cashRegister;
}

// open
console.log(checkCashRegister(10, 26, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// closed
console.log(checkCashRegister(10, 345.41, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// insufficient funds
console.log(checkCashRegister(10, 345.42, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// extra scenario
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// extra scenario 2
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// extra scenario 3
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));