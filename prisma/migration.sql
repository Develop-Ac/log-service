-- Migration SQL para criar a tabela sis_log
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS sis_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario VARCHAR(100) NOT NULL,
    setor VARCHAR(100) NOT NULL,
    tela VARCHAR(100) NOT NULL,
    acao VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
