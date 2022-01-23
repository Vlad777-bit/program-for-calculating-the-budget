let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;


startBtn.addEventListener('click', function() {
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

// Слепая вера и спагетти-кода
expensesBtn.addEventListener('click', () => {
    let sum = 0;

    try {
        for (let i = 0; i < expensesItem.length; i++) {
            let expensesName = expensesItem[i].value,
                expensesPrice = expensesItem[++i].value;
        
            if (expensesName != "" && expensesPrice != "" && expensesName.length < 50 && !isNaN(expensesPrice)) {
                appData.expenses[expensesName] = expensesPrice;
                sum += +expensesPrice;
            } else {
               i = i - 1;
            }
        }
        expensesValue.textContent = sum;
    } catch (e) {
        expensesValue.textContent = 'Вы не ввели данные или они не корректные!';
    }

    
});

optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i <= optionalExpensesItem.length; i++) {

        if (!optionalExpensesItem[i]) {
            return
        }

        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }

});

// Магические числа
countBtn.addEventListener('click', () => {

    const oneMonth = 30;
    const minimalIncome = 100;
    const middleIncome = 2000;

    if (!appData.budget) {
        dayBudgetValue.textContent = 'Ошибочка...!';
        return;
    }

    appData.moneyPerDay = (appData.budget / oneMonth).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay < minimalIncome) {
        levelValue.textContent = 'Это минимальный уровень достатка!';
    } else if (appData.moneyPerDay > minimalIncome && appData.moneyPerDay < middleIncome) {
        levelValue.textContent = 'Это средний уровень достатка!';
    } else if (appData.moneyPerDay > middleIncome) {
        levelValue.textContent = 'Это высокий уровень достатка!';
    } else {
        levelValue.textContent = 'Ошибочка...!';
    }
});

incomeItem.addEventListener('input', function() {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;   
});

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

// нарушение принципа DRY и могические числа
function handleInputEvent(inputElement) {

    const numberOfMonths = 12;

    inputElement.addEventListener('input', () => {
        if (appData.savings) {
            let sum = +sumValue.value,
                percent = +percentValue.value;
    
            appData.monthIncome = sum / 100 / numberOfMonths * percent;
            appData.yearIncome = sum / 100 * percent;
    
            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    });
}

handleInputEvent(sumValue);
handleInputEvent(percentValue);

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

