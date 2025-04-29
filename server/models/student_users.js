'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student_users.init({
    id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    student_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'student_users',
  });
  return student_users;
};