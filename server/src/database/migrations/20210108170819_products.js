exports.up = function (knex) {
    return knex.schema.createTable("products", (table) => {
        table.increments("id").primary();

        table.string("product").notNullable();
        table.string("description").notNullable();
        table.integer("price").notNullable();

        table
            .integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
        table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("products");
};
