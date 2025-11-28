DROP DATABASE IF EXISTS cantina;
CREATE DATABASE cantina;

USE cantina;

CREATE TABLE aluno (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
turma VARCHAR(100)
);


CREATE TABLE lanche (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
tipo_lanche VARCHAR(100),
preco VARCHAR(100)
);


CREATE TABLE pedido (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
aluno_id INTEGER,
FOREIGN KEY (aluno_id) REFERENCES aluno(id),
lanche_id INTEGER,
FOREIGN KEY (lanche_id) REFERENCES lanche(id),
quantidade INTEGER,
observacao VARCHAR(100)
);


INSERT INTO aluno
VALUES (DEFAULT, "Vinicius Godoi", "6 ano A");

INSERT INTO aluno
VALUES (DEFAULT, "Kauã Lucio", "7 ano B");

INSERT INTO aluno
VALUES (DEFAULT, "Murilo Chiarello", "8 ano A");

INSERT INTO aluno
VALUES (DEFAULT, "Thomas Batoni", "6 ano B");



INSERT INTO lanche
VALUES (DEFAULT, "Pastel de Frango", "9,00");

INSERT INTO lanche
VALUES (DEFAULT, "Suco Natutal", "10,00");

INSERT INTO lanche
VALUES (DEFAULT, "Presunto e Queijo", "9,00");

INSERT INTO lanche
VALUES (DEFAULT, "Refrigerante", "8,00");

INSERT INTO lanche
VALUES (DEFAULT, "Suco de goiaba", "9,00");



INSERT INTO pedido
VALUES (DEFAULT, "1", "2", "2", "");

INSERT INTO pedido
VALUES (DEFAULT, "2", "1", "1", "Queria que estivesse quente");

INSERT INTO pedido
VALUES (DEFAULT, "3", "3", "1", "Poderia estar mais frito");

INSERT INTO pedido
VALUES (DEFAULT, "4", "5", "1", "Queria o suco sem acucar");


Select lanche.tipo_lanche as 'lanche', count(pedido.id) as 'Total de pedido' from lanche inner join pedido on lanche.id = pedido.lanche_id group by lanche.tipo_lanche;

Select aluno.id as 'ID do aluno', aluno.nome as 'Aluno', aluno.turma as 'Turma',
sum(pedido.quantidade * lanche.preco) as 'Total gasto' from aluno inner join pedido on aluno.id = pedido.aluno_id inner join lanche on lanche.id = pedido.lanche_id group by aluno.id, aluno.nome, aluno.turma order by aluno.id;


select sum(pedido.quantidade * lanche.preco) as 'Total faturado' from pedido inner join lanche on lanche.id = pedido.lanche_id;

