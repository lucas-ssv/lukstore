import db from "../../database/connection";
import * as Yup from "yup";

class ProductController {
    async index(req, res) {
        const { user_id } = req.body;

        const products = await db("products")
            .where("users.id", "=", user_id)
            .join("products_stock", "products.id", "=", "products_stock.id")
            .join("users", "products.user_id", "=", "users.id")
            .select([
                "products.*",
                "products_stock.amount",
                "users.name",
                "users.email",
            ]);

        return res.json(products);
    }

    async show(req, res) {
        const { id, q } = req.query;

        const product = await db("products")
            .where("products.product", "like", `%${q}%`)
            .where("users.id", "=", id)
            .join("products_stock", "products.id", "=", "products_stock.id")
            .join("users", "products.user_id", "=", "users.id")
            .select([
                "products.*",
                "products_stock.amount",
                "users.name",
                "users.email",
            ]);

        return res.status(200).json(product);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            product: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.number().required(),
            amount: Yup.number().required(),
            user_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Validation fails!" });
        }

        const { product, description, price, amount, user_id } = req.body;

        const trx = await db.transaction();

        const user = await trx("users").where("users.id", "=", user_id).first();

        if (!user) {
            await trx.rollback();

            return res.status(400).json({ error: "User not exists" });
        }

        try {
            const insertedProducts = await trx("products").insert({
                product,
                description,
                price,
                user_id,
            });

            const product_id = insertedProducts[0];

            await trx("products_stock").insert({
                amount,
                product_id,
            });

            await trx.commit();

            return res
                .status(201)
                .json({ success: "Product created with success" });
        } catch (err) {
            await trx.rollback();

            return res
                .status(400)
                .json({ error: "Unexpected error while creating new product" });
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            product: Yup.string().required(),
            description: Yup.string(),
            price: Yup.number().required(),
            amount: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Validation fails" });
        }

        const { id } = req.params;

        const { product, description, price, amount, user_id } = req.body;

        const user = await db("users").where("users.id", "=", user_id).first();

        if (!user) {
            return res.status(400).json({ error: "User not exists" });
        }

        const productExists = await db("products")
            .where("products.id", "=", id)
            .first();

        if (!productExists) {
            return res.status(400).json({ error: "Product not exists" });
        }

        const updatedProduct = await db("products")
            .where("products.id", "=", id)
            .update({
                product,
                description,
                price,
                user_id,
            });

        const product_id = updatedProduct[0];

        await db("products_stock").update({
            amount,
            product_id,
        });

        return res
            .status(200)
            .json({ message: "Product updated with success" });
    }

    async delete(req, res) {
        const { id, user_id } = req.params;

        const trx = await db.transaction();

        const user = await trx("users").where("users.id", "=", user_id).first();

        if (!user) {
            await trx.rollback();

            return res.status(400).json({ error: "User not exists" });
        }

        try {
            const productExists = await trx("products")
                .join("users", "products.user_id", "=", "users.id")
                .where("products.id", "=", id)
                .where("users.id", "=", user_id)
                .first();

            if (!productExists) {
                await trx.rollback();

                return res.status(400).json({ error: "Product not exists" });
            }

            await trx("products")
                .where({
                    id,
                })
                .del();

            await trx.commit();

            return res
                .status(200)
                .json({ success: "Product deleted with success" });
        } catch (err) {
            await trx.rollback();

            console.log(err);

            return res
                .status(400)
                .json({ error: "Unexpected error while deleting new product" });
        }
    }
}

export default new ProductController();
