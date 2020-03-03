'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => await
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        queryInterface.bulkInsert(
            'Users',
            [
                {
                    name: 'Jane Doe',
                    email: 'janedoe@example.com',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Jon Doe',
                    email: 'jondoe@example.com',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        ),

    down: async (queryInterface, Sequelize) => await
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        queryInterface.bulkDelete('Users', null, {})

};
