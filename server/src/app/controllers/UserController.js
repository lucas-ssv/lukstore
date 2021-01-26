import bcrypt from "bcrypt";
import * as Yup from "yup";

import db from "../../database/connection";

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().min(8).required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const { name, email, password } = req.body;

        const trx = await db.transaction();

        try {
            const userExists = await trx("users")
                .select("*")
                .then((users) => {
                    return Boolean(users.find((user) => user.email === email));
                });

            if (userExists) {
                await trx.rollback();

                return res.status(400).json({ error: "User already exists" });
            }

            bcrypt.hash(password, 8).then(async (hashedPassword) => {
                return trx("users")
                    .insert({
                        name,
                        email,
                        password_hash: hashedPassword,
                    })
                    .then(async () => {
                        await trx.commit();

                        return res
                            .status(201)
                            .json({ success: "User created with success" });
                    });
            });
        } catch (err) {
            await trx.rollback();

            return res
                .status(400)
                .json({ error: "An occured error to create user" });
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().required(),
            oldPassword: Yup.string().min(8),
            password: Yup.string()
                .min(8)
                .when("oldPassword", (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when("password", (password, field) =>
                password ? field.required().oneOf([Yup.ref("password")]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const {
            name,
            email,
            oldPassword,
            password,
            confirmPassword,
        } = req.body;

        const user = await db("users")
            .select("*")
            .where("users.id", "=", req.userId)
            .first();

        if (email && email !== user.email) {
            const emailExists = await db("users")
                .select("*")
                .then((users) => {
                    return Boolean(users.find((user) => user.email === email));
                });

            if (emailExists) {
                return res.status(400).json({ error: "User already exists" });
            }
        }

        if (password && password !== confirmPassword) {
            return res.status(400).json({
                error: "Password and confirm password doesn't equals",
            });
        }

        bcrypt
            .compare(oldPassword, user.password_hash)
            .then(async (isAuthenticated) => {
                if (oldPassword && !isAuthenticated) {
                    return res
                        .status(401)
                        .json({ error: "Password does not match" });
                } else {
                    bcrypt.hash(password, 8).then(async (hashedPassword) => {
                        await db("users")
                            .select("*")
                            .where("users.id", "=", req.userId)
                            .update({
                                name,
                                email,
                                password_hash: hashedPassword,
                            })
                            .then(async (user_id) => {
                                const { id, name, email } = await db("users")
                                    .where("users.id", "=", user_id)
                                    .first();

                                return res.status(201).json({
                                    id,
                                    name,
                                    email,
                                });
                            });
                    });
                }
            });
    }
}

export default new UserController();
