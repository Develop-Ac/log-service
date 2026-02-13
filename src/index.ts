import express from 'express';
import { json } from 'express';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(json());

// Configuração do banco de dados PostgreSQL via variável de ambiente
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.post('/log', async (req, res) => {
  const { usuario, setor, tela, acao, descricao } = req.body;
  if (!usuario || !setor || !tela || !acao || !descricao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }
  const id = uuidv4();
  try {
    await pool.query(
      'INSERT INTO sis_log (id, usuario, setor, tela, acao, descricao) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, usuario, setor, tela, acao, descricao]
    );
    res.status(201).json({ message: 'Log salvo com sucesso!', id });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar log', details: err });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
