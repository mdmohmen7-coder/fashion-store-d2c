const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function importSQL() {
  try {
    console.log('Reading fashion_store_db.sql file...');
    const sqlFilePath = path.join(__dirname, 'fashion_store_db.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    // Splitting queries safely
    const connection = await pool.getConnection();
    console.log('Connected to Aiven MySQL Cloud! Importing tables and data...');

    // Multi-statement query execution
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
    
    // Split by semicolon that is followed by newline to execute queries
    const statements = sql
      .replace(/DELIMITER ;;/g, '')
      .replace(/;;/g, ';')
      .split(/;\r?\n/)
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('/*') && !stmt.startsWith('--'));

    for (let statement of statements) {
      if (statement) {
        await connection.query(statement);
      }
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
    connection.release();

    console.log('✅ ALL TABLES & PRODUCTS MIGRATED TO CLOUD SUCCESSFULLY!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

importSQL();