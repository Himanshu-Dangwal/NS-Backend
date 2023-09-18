const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data', 'data.json');

const getAllUsers = (req, res) => {
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const users = JSON.parse(data);
    res.status(200).json(users);
  });
};

const createUser = (req, res) => {
  const { name, email } = req.body;

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const users = JSON.parse(data);
    const newUser = { id: generateUserId(users), name, email };
    users.push(newUser);

    fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.status(201).json({ message: 'User created', user: newUser });
    });
  });
};

// Function to generate a unique user ID
const generateUserId = (users) => {
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
  return maxId + 1;
};

const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    let users = JSON.parse(data);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    users[userIndex] = { ...users[userIndex], name, email };

    fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.status(200).json({ message: 'User updated', user: users[userIndex] });
    });
  });
};

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    let users = JSON.parse(data);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const deletedUser = users.splice(userIndex, 1);

    fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.status(200).json({ message: 'User deleted', user: deletedUser });
    });
  });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
