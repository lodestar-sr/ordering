import * as Yup from 'yup';

const OrderValidationSchema = Yup.object().shape({
  customer_id: Yup.number().required('Customer is required'),
  orderItems: Yup.array().of(
    Yup.object().shape({
      product_id: Yup.number().required('Product ID is required'),
      quantity: Yup.number()
        .required('Quantity is required')
        .positive('Quantity must be positive')
        .integer('Quantity must be an integer'),
      unit_price: Yup.number().required('Unit price is required'),
    })
  ),
});

export default OrderValidationSchema;
