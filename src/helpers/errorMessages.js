const errorMessages = {
  invalidCategoria: "Categoria não encontrada.",
  invalidEmailOrSenha: "Email e/ou senha inválido(s).",
  invalidEmailOrCpf: "Email e/ou CPF inválido(s).",
  invalidToken:
    "Para acessar este recurso um token de autenticação válido deve ser enviado",
  duplicateEmail:
    "O e-mail informado já está sendo utilizado por outro usuário",
  duplicateCPF: "O CPF informado já está sendo utilizado por outro usuário",
  server: "Erro interno do servidor.",
  customerWasNotRegistered: "Cliente não foi cadastrado.",
  clientIdMusteBeNumber: "O valor precisa ser um número",
  orderNotfound: "Pedido(s) não encontrado(s)",
  customerNotFound: (id) => `Cliente com ID ${id} não foi encontrado`,
  productNotFound: (id) => `Produto com ID ${id} não foi encontrado.`,
  typeErrorString: (name) => `${name} deve ser uma string.`,
  typeErrorNumber: (name) => `${name} deve ser um número.`,
  typeErrorArray: (name) => `${name} deve ser um array.`,
  isValidQuantityProduct: (id, quantidade) =>
    `Quantidade informada (${quantidade}) para o produto de ID ${id} deve ser MAIOR ou IGUAL a 1.`,
  hasSufficientStockProduct: (id, quantidade) =>
    `Quantidade informada (${quantidade}) para o produto de ID ${id} está indisponível`,
  linkedProduct: (findProductOrder) =>
    `O produto ao qual deseja deletar esta vinculado ao pedido_produtos com ID ${findProductOrder}!`,
};

module.exports = errorMessages;