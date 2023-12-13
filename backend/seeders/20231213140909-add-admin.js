'use strict';
const bcrypt = require('bcrypt')
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'Annie',
      last_name: 'Ullyot',
      email: 'admin@example.com',
      role: 'admin',
      password_digest: await bcrypt.hash("test", 10),
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: 'admin@example.com'
    })
  }
}
