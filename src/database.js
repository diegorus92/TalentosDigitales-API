import mysqlConnection from 'mysql2/promise';

const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library'
}

export const poolRequest = mysqlConnection.createPool(properties);