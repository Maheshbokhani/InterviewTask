import SQLite from 'react-native-sqlite-storage';

interface Props {
  userList: userProps[] | [];
  createDB: () => void;
  insertDB: (name, email) => void;
  fetchDB: (callBack?: (users) => void) => void;
  updateDB: (id: string, name: string, email: string) => void;
  deleteDB: (id: string) => void;
}

interface userProps {
  email: string;
  name: string;
  id: string;
}

// Open or create a database
const db = SQLite.openDatabase({name: 'my.db2', location: 'default'});

const dbServices: Props = {
  userList: [],
  createDB: () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          updated_date TEXT
        );`,
        [],
        () => {
          console.log('Table created successfully');
        },
        error => console.error('Error creating table:', error),
      );
    });
  },
  insertDB: (name, email) => {
    const date = new Date();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, email, updated_date) VALUES (?, ?, ?)',
        [name, email, date],
        () => {},
        error => console.error('Error inserting user:', error),
      );
    });
  },
  fetchDB: callBack => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (_, result) => {
          const users = result.rows.raw(); // or result.rows._array
          dbServices.userList = users;
          callBack(users);
        },
        (_, error) => console.log('Error fetching users: ', error),
      );
    });
  },
  updateDB: (id, name, email) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id],
        _ => {
          dbServices.fetchDB();
        },
        (_, error) => console.log('Error updating user: ', error),
      );
    });
  },
  deleteDB: id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM users WHERE id = ?',
        [id],
        _ => {
          dbServices.fetchDB();
        },
        (_, error) => console.log('Error deleting user: ', error),
      );
    });
  },
};

export default dbServices;
