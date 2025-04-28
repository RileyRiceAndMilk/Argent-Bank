const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(bodyParser.json()); 

let users = [
  {
    id: "1",
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@stark.com",
    password: "password123",
    accounts: [
      {
        accountId: "checking-1",
        title: "Argent Bank Checking (x8349)",
        amount: 2082.79,  
        description: "Available Balance",
        accountType: "checking",
      },
      {
        accountId: "savings-1",
        title: "Argent Bank Savings (x6712)",
        amount: 10928.42,  
        description: "Available Balance",
        accountType: "savings",
      },
    ],
  },
];

const parseAmount = (amount) => {
  if (typeof amount === 'string') {
    return parseFloat(amount.replace(/[^0-9.-]+/g, ''));
  }
  return amount;
};

app.get('/user/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user); 
  } else {
    res.status(404).json({ message: 'User not found' }); 
  }
});

app.put('/user/:id', (req, res) => {
  const { firstName, lastName, email, accounts } = req.body;
  const userIndex = users.findIndex(u => u.id === req.params.id);

  if (userIndex !== -1) {
    const updatedUser = {
      ...users[userIndex],
      firstName: firstName || users[userIndex].firstName,
      lastName: lastName || users[userIndex].lastName,
      email: email || users[userIndex].email,
    };

    if (accounts) {
      updatedUser.accounts = updatedUser.accounts.map(account => {
        const newAccount = accounts.find(acc => acc.accountId === account.accountId);
        if (newAccount) {
          return {
            ...account,
            title: newAccount.title || account.title,
            amount: parseAmount(newAccount.amount) || account.amount,
            description: newAccount.description || account.description,
          };
        }
        return account;
      });
    }

    users[userIndex] = updatedUser;

    res.json(updatedUser); 
  } else {
    res.status(404).json({ message: 'User not found' }); 
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


