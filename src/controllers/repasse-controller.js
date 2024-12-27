const connectOracle = require('../config/db-connection');

const getRepasse = async (req, res) => {
    try {
        const connection = await connectOracle();
        const result = await connection.execute('SELECT * FROM REPASSE_PRESTADOR WHERE CD_REPASSE = 69');
        res.status(200).json(result.rows);
        await connection.close();
    } catch (error) {
        res.status(500).json({ message: 'Error on getRepasse', error });
    }
};

const getRepasseId = async (req, res) => {
    try {
        const connection = await connectOracle();
        const { id } = req.params;
        const result = await connection.execute('SELECT * FROM REPASSE_PRESTADOR WHERE CD_REPASSE = :id', [id]);
        res.status(200).json(result.rows);
        await connection.close();
    } catch (error) {
        res.status(500).json({ message: 'Error on getRepasseId', error });
    }
};

module.exports = { getRepasse, getRepasseId };