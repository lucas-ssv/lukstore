exports.up = function (knex) {
    return knex.schema.createTable("products_stock", (table) => {
        table.increments("id").primary();

        table.integer("amount").notNullable();

        table
            .integer("product_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("products")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
        table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("products_stock");
};
