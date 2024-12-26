require('dotenv').config();
const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 3000;

const databaseUrl = process.env.DB_CONNECTION_STRING;

oracledb.initOracleClient({libDir: ''});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error: 'Algo deu errado!'});
});

async function executeQuery(sql, binds) {
  let connection;
  try{
    connection = await oracledb.getConnection({databaseUrl});
    const result = await connection.execute(sql, binds);
    return result.rows;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.get('/', async (req, res) => {
  res.send('Rodando a api');
});

app.get('/query', async (req, res) => {
  const sql = 'SELECT * FROM DBAMV.REPASSE_PRESTADOR WHERE cd_repasse = 69';
  const result = await executeQuery(sql);
  res.json(result);
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});