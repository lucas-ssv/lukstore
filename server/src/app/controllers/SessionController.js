import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Yup from "yup";

import db from "../../database/connection";

import authConfig from "../../config/auth";

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Validation fails" });
        }

        const { email, password } = req.body;

        await db("users")
            .where({
                email,
            })
            .first()
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: "User not found" });
                } else {
                    return bcrypt
                        .compare(password, user.password_hash)
                        .then((isAuthenticated) => {
                            if (!isAuthenticated) {
                                return res
                                    .status(401)
                                    .json({ error: "Unauthorized access" });
                            } else {
                                const { id, name } = user;

                                return res.json({
                                    user: {
                                        id,
                                        name,
                                        email,
                                    },
                                    token: jwt.sign({ id }, authConfig.secret, {
                                        expiresIn: authConfig.expiresIn,
                                    }),
                                });
                            }
                        });
                }
            });
    }
}

export default new SessionController();
