import transactionTransformer from '../../../src/app/transformers/transactionTransformer';

describe('Check transaction Transformer', () => {
  it('should be able to check the response of transaction transformer transactionOne', () => {
    const created = new Date();
    const transaction = {
      id: 3,
      description: 'Smartband XYZ 3.0',
      amount: 15000,
      payment_method: 'debit_card',
      card_number: '1111',
      card_name: 'John Johnson',
      card_expiration_date: '1022',
      card_cvv: '123',
      createdAt: created.getTime(),
    };
    const response = transactionTransformer.transactionOne(transaction);
    expect(response).toHaveProperty('id', 3);
    expect(response).toHaveProperty('description', 'Smartband XYZ 3.0');
    expect(response).toHaveProperty('amount', 15000);
    expect(response).toHaveProperty('payment_method', 'debit_card');
    expect(response).toHaveProperty('card_last_number', '1111');
    expect(response).toHaveProperty('card_name', 'John Johnson');
    expect(response).toHaveProperty('card_expiration_date', '1022');
    expect(response).toHaveProperty('card_cvv', '123');
    expect(response).toHaveProperty('created_at', created.getTime());
  });

  it('should be able to check the response of transaction transformer transactionList', () => {
    const created = new Date();
    const transaction = {
      count: 1,
      rows: [
        {
          id: 3,
          description: 'Smartband XYZ 3.0',
          amount: 15000,
          payment_method: 'debit_card',
          card_number: '1111',
          card_name: 'John Johnson',
          card_expiration_date: '1022',
          card_cvv: '123',
          createdAt: created.getTime(),
        },
      ],
    };
    const transactions = transactionTransformer.transactions(transaction);
    const [response] = transactions.data;
    expect(response).toHaveProperty('id', 3);
    expect(response).toHaveProperty('description', 'Smartband XYZ 3.0');
    expect(response).toHaveProperty('amount', 15000);
    expect(response).toHaveProperty('payment_method', 'debit_card');
    expect(response).toHaveProperty('card_last_number', '1111');
    expect(response).toHaveProperty('card_name', 'John Johnson');
    expect(response).toHaveProperty('card_expiration_date', '1022');
    expect(response).toHaveProperty('card_cvv', '123');
    expect(response).toHaveProperty('created_at', created.getTime());
  });
});
