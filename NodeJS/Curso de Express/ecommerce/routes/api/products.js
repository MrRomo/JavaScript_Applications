const express = require('express')
const router = express()
const ProductsService = require('../../services/products')

const productService = new ProductsService()

//lista los productos 
router.get('/', async (req, res, next) => {
  const { tags } = req.query
  console.log('req: ', req.query);
  
  try {
    const products = await productService.getProducts({ tags })

    res.status(200).json({
      data: products,
      message: 'products listed'
    })

  } catch (err) {
    next(err)
  }
})

//lista un producto en especifico
router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params
  console.log('req: ', req.params);

  try {
    const product = await productService.getProduct({ productId })
    res.status(200).json({
      data: product[0],
      message: 'product retrieve'
    })
  } catch (err) {
    next(err)
  }

})

//directiva para la creacion de un producto
router.post('/', async (req, res, next) => {
  const { body: product } = req
  console.log('req: ', req.body);

  try {

    const createdProduct = await productService.createProduct({ product })

    res.status(201).json({
      data: createdProduct,
      message: 'product created'
    })
  } catch (err) {
    next(err)
  }
})

//directiva para la edicion de un producto
router.put('/:productId', async (req, res, next) => {
  const { productId } = req.params
  const { body: product } = req
  console.log('req: ', req.params, req.body);

  try {
    const updatedProduct = await productService.updateProduct({ productId, product })

    res.status(200).json({
      data: updatedProduct,
      message: 'product updated'
    })

  } catch (err) {
    next(err)
  }

})

//eliminacion de un producto
router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params
  console.log('req: ', req.params);

  try {
    const deletedProduct = await productService.updateProduct({ productId })
    res.status(200).json({
      data: deletedProduct,
      message: 'products delete'
    })

  } catch (err) {
    next(err)
  }

})




module.exports = router