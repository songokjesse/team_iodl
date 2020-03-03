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
            "Activities",
            [
                {
                    userId: 1,
                    date: new Date(),
                    activity:
                        "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
                    challanges: "None",
                    remarks: "None",
                    status: "Done",
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 2,
                    date: new Date(),
                    activity:
                        "NMaecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat",
                    challanges: "None",
                    remarks: "None",
                    status: "Done",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        ),

    down: async (queryInterface, Sequelize) => await
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        queryInterface.bulkDelete('Activities', null, {})
};
