import Sequelize, { Model } from 'sequelize';

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
        amount: Sequelize.INTEGER,
        payment_method: Sequelize.STRING,
        card_number: Sequelize.STRING,
        card_name: Sequelize.STRING,
        card_expiration_date: Sequelize.STRING,
        card_cvv: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeCreate', async transaction => {
      transaction.card_number = transaction.card_number.substr(
        transaction.card_number.length - 4
      );
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.hasMany(models.Payable, { foreignKey: 'transaction_id' });
  }
}

export default Transaction;
