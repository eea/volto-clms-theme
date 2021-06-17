export default function getProductGroups(useCases) {
  let products = {};
  let exists = false;
  useCases.forEach((useCase) => {
    useCase.products.forEach((product) => {
      exists = Object.keys(products).includes(product.token);
      if (!exists) {
        products = {
          ...products,
          [product.token]: { title: product.title, useCases: [useCase] },
        };
      } else {
        products = {
          ...products,
          [product.token]: {
            ...products[product.token],
            useCases: [...products[product.token].useCases, useCase],
          },
        };
      }
    });
  });
  return products;
}
