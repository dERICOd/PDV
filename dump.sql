create database pdv;

create table usuarios (
    id serial primary key,
    nome text not null,
    email text unique not null,
    senha text not null
);
create table categorias (
    id serial primary key,
    descricao text not null
);

create table produtos(
    id serial primary key,
    descricao text,
    quantidade_estoque integer not null,
    valor integer not null,
    categoria_id integer not null references categorias(id),
    produto_imagem text
);

create table clientes(
    id serial primary key,
    nome text not null,
    email text unique not null,
    cpf text unique not null,
    cep text,
    rua text,
    numero text,
    bairro text,
    cidade text,
    estado text
);

create table pedidos(
    id serial primary key,
    cliente_id integer not null references clientes(id),
    observacao text,
    valor_total integer
);

create table pedido_produtos(
    id serial primary key,
    pedido_id integer not null references pedidos(id),
    produto_id integer not null references produtos(id),
    quantidade_produto integer not null check(quantidade_produto > 0),
    valor_produto integer not null
);

INSERT INTO categorias (descricao)
VALUES ('Informática'),
    ('Celulares'),
    ('Chevrolet'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');
