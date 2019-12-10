module.exports = function ({ product }) {
  let keySearch = {}
  if (product) keySearch.$or = [{ category: new RegExp(product, 'gi') }]
  return keySearch
}