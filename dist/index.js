"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const pg_1 = require("pg");
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use((0, express_2.json)());
// Configuração do banco de dados PostgreSQL via connection string
const pool = new pg_1.Pool({
    connectionString: 'postgres://intranet:Ac@2025acesso@panel-teste.acacessorios.local:5555/intranet?sslmode=disable',
});
app.post('/log', async (req, res) => {
    const { usuario, setor, tela, acao, descricao } = req.body;
    if (!usuario || !setor || !tela || !acao || !descricao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    const id = (0, uuid_1.v4)();
    try {
        await pool.query('INSERT INTO sis_log (id, usuario, setor, tela, acao, descricao) VALUES ($1, $2, $3, $4, $5, $6)', [id, usuario, setor, tela, acao, descricao]);
        res.status(201).json({ message: 'Log salvo com sucesso!', id });
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao salvar log', details: err });
    }
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
