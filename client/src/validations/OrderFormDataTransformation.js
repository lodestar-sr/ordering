const transformOrderFormData = (values, products) => {
  const orderItems = products
    .filter(product => values.products.includes(product.id))
    .map(product => ({
      product_id: product.id,
      quantity: values.order_items[product.id] || 1 // Default to 1 if new product
    }));

  return {
    ...values,
    orderItems: orderItems
  };
};

export default transformOrderFormData;
