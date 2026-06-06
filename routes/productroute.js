const {Router} = require('express');
const { createproducts, getproducts, updateproducts, deleteproducts,InsertMany } = require('../controller/productcontroller');
const productrouter=Router  ();
productrouter.post('/', createproducts);
productrouter.get('/', getproducts);
productrouter.put('/:id', updateproducts);
productrouter.delete('/:id', deleteproducts);
productrouter.post('/bulk',InsertMany);
module.exports=productrouter;