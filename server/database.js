const Sequelize = require('sequelize');

const sequelize = new Sequelize("coding-memo", null, null, {
    dialect: "sqlite",
    storage: "server/database.sqlite3",
});


const Language = sequelize.define("languages", {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    name: Sequelize.STRING,
    highlight_class: Sequelize.STRING,
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
});

const Example = sequelize.define("examples", {
    id:             {type: Sequelize.INTEGER, primaryKey: true},
    name:           Sequelize.STRING,
    description:    Sequelize.STRING,
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
});

const CodeExample = sequelize.define("code_examples", {
    id:             {type: Sequelize.INTEGER, primaryKey: true},
    code:           Sequelize.TEXT,
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
});

Language.hasMany(CodeExample, {onDelete: "cascade", foreignKey : 'language_id'});
CodeExample.belongsTo(Language, {foreignKey : 'language_id'});

Example.hasMany(CodeExample, {onDelete: "cascade", foreignKey : 'example_id'});
CodeExample.belongsTo(Example, {foreignKey : 'example_id'});


module.exports = {
    sequelize,
    Language,
    Example,
    CodeExample
};
