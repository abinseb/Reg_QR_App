import { openDatabase } from "expo-sqlite";

const db = openDatabase('Registration.db');

db.transaction(tx1 => {
    tx1.executeSql(
        'CREATE TABLE IF NOT EXISTS ip_data (ipurl TEXT);',
        [],
        () => console.log('ipTable created Successfully'),
        error => console.error('Error:', error)
    );
});
export const verified_Offline=()=>{
db.transaction(tx2 =>{
  tx2.executeSql(
    'CREATE TABLE IF NOT EXISTS verified_data (Id INTEGER);',
    [],
    ()=> console.log("verified_data table created"),
    error => console.error('Error :', error)
  );
});
}

// table for storing registration data

db.transaction(tx =>{
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS gun_data (Id INTEGER PRIMARY KEY, Name TEXT, Institution TEXT, Email TEXT, Phone TEXT, Verified BOOLEAN);',
        [],
        () => console.log('Table created Successfully'),
        error => console.error('Error creating table :',error)
    );
});


export const insertData = (data) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO gun_data (Id ,Name, Institution, Email, Phone, Verified) VALUES (?, ?, ?, ?, ?);',
        [data.Id,data.Name, data.Institution, data.Email, data.Phone, data.Verified],
        (_, { insertId }) => console.log(`Inserted row with ID ${insertId}`),
        (error) => console.error('Error inserting data: ', error)
      );
    });
  };
  

  export const insertIpAddress = (ipAddressUrl) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO ip_data (ipurl) VALUES (?);',
        [ipAddressUrl],
        (_, { insertId }) => console.log(`Inserted IP address URL with ID ${insertId}`),
        (error) => console.error('Error inserting IP address URL: ', error)
      );
    });
  };