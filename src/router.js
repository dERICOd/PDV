const { Router } = require("express");
const {
  customerUpdateFields,
  customerRegisterFields,
  customerId,
} = require("./middlewares/md_customers");
const {
  loginFields,
  auth,
  registerFields,
  updateFields,
} = require("./middlewares/md_users");
const {
  productFields,
  validateProdutoId,
  multer,
} = require("./middlewares/md_products");
const { orderFields } = require("./middlewares/md_orders");
const { updateUser } = require("./controllers/user/update");
const { registerUser } = require("./controllers/user/register");
const { login } = require("./controllers/user/login");
const { listCategories } = require("./controllers/categories/list");
const { userProfile } = require("./controllers/user/profile");
const { getAllCustomers } = require("./controllers/customers/list");
const { getCustomerById } = require("./controllers/customers/listId");
const { deleteProductById } = require("./controllers/product/delete");
const { registerCustomer } = require("./controllers/customers/register");
const { updateCustomer } = require("./controllers/customers/update");
const { registerOrder } = require("./controllers/order/register");
const { listProducts } = require("./controllers/product/list");
const { detailProducts } = require("./controllers/product/detail");
const { registerProduct } = require("./controllers/product/register");
const { updateProduct } = require("./controllers/product/update");

const router = Router();

router.post("/usuario", registerFields, registerUser);
router.post("/login", loginFields, login);
router.get("/categoria", listCategories);

router.use(auth);

router.put("/usuario", updateFields, updateUser);
router.get("/usuario", userProfile);
router.get("/categoria", listCategories);
router.get("/cliente", getAllCustomers);
router.get("/cliente/:id", customerId, getCustomerById);
router.delete("/produto/:id", deleteProductById);
router.post(
  "/produto",
  multer.single("produto_imagem"),
  productFields,
  registerProduct
);
router.put(
  "/produto/:id",
  multer.single("produto_imagem"),
  productFields,
  validateProdutoId,
  updateProduct
);
router.get("/produto", listProducts);
router.get("/produto/:id", detailProducts);

router.post("/cliente", customerRegisterFields, registerCustomer);
router.put("/cliente/:id", customerUpdateFields, updateCustomer);

router.post("/pedido", orderFields, registerOrder);

module.exports = router;
