'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "industries", deps: []
 * createTable "admins", deps: []
 * createTable "userPayments", deps: [users]
 * createTable "productCarts", deps: [users]
 * createTable "productsDepartments", deps: [admins]
 * createTable "product_categories", deps: [products]
 * createTable "userAddresses", deps: [users]
 * createTable "products", deps: [productCarts, admins]
 *
 **/

var info = {
    "revision": 1,
    "name": "add-awesome-field-in-my-table",
    "created": "2022-10-10T20:17:21.358Z",
    "comment": ""
};

var migrationCommands = [

    {
        fn: "createTable",
        params: [
            "users",
            {
                "userId": {
                    "primaryKey": true,
                    "type": Sequelize.UUID
                },
                "username": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "email": {
                    "validate": {},
                    "unique": {
                        "name": "email already exits",
                        "msg": "User already exists with this email"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "first_name": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "last_name": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "password": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "role": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "user_profile_image": {
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "industries",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "admins",
            {
                "id": {
                    "primaryKey": true,
                    "type": Sequelize.UUID
                },
                "username": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "email": {
                    "validate": {},
                    "unique": true,
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "password": {
                    "validate": {},
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "userPayments",
            {
                "id": {
                    "primaryKey": true,
                    "type": Sequelize.UUID
                },
                "payment_type": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "card_number": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "card_expiry_date": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "card_cvv": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "card_holder_name": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "created_at": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updated_at": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "userId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "userId"
                    },
                    "allowNull": true,
                    "type": Sequelize.UUID
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "productCarts",
            {
                "cartId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "userId"
                    },
                    "primaryKey": true,
                    "allowNull": true,
                    "type": Sequelize.UUID
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "productsDepartments",
            {
                "id": {
                    "primaryKey": true,
                    "type": Sequelize.UUID
                },
                "name": {
                    "validate": {},
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "type": Sequelize.DATE
                },
                "adminId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "admins",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.UUID
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "product_categories",
            {
                "id": {
                    "primaryKey": true,
                    "type": Sequelize.UUID
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "categoryId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "products",
                        "key": "productId"
                    },
                    "allowNull": true,
                    "type": Sequelize.UUID
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "userAddresses",
            {
                "id": {
                    "primaryKey": true,
                    "type": Sequelize.UUID
                },
                "address_line1": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "address_line2": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "city": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "postal_code": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "country": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "telephone": {
                    "validate": {},
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "userId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "userId"
                    },
                    "allowNull": true,
                    "type": Sequelize.UUID
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "products",
            {
                "productId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "productCarts",
                        "key": "cartId"
                    },
                    "primaryKey": true,
                    "allowNull": true,
                    "type": Sequelize.UUID
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "price": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "description": {
                    "validate": {},
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "type": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "status": {
                    "allowNull": false,
                    "type": Sequelize.BOOLEAN
                },
                "currency": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "image": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "adminId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "admins",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.UUID
                }
            },
            {}
        ]
    }
];

var rollbackCommands = [{
        fn: "dropTable",
        params: ["userPayments"]
    },
    {
        fn: "dropTable",
        params: ["productCarts"]
    },
    {
        fn: "dropTable",
        params: ["productsDepartments"]
    },
    {
        fn: "dropTable",
        params: ["product_categories"]
    },
    {
        fn: "dropTable",
        params: ["userAddresses"]
    },
    {
        fn: "dropTable",
        params: ["products"]
    },
    {
        fn: "dropTable",
        params: ["users"]
    },
    {
        fn: "dropTable",
        params: ["industries"]
    },
    {
        fn: "dropTable",
        params: ["admins"]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    down: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < rollbackCommands.length)
                {
                    let command = rollbackCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
