/**
 * Хороший пример использования passport
 * https://github.com/didinj/node-express-mongoose-passport-jwt-rest-api-auth
 */
import {PassportStatic} from "passport";
import User from "../models/User";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

interface JwtPayload {
    userId: "string";
    iat: number;
    exp: number;
}

/**
 * Кофигурирует passport.
 *
 * @param passport Passport.
 */
const configure = (passport: PassportStatic) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt"),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(
        new JwtStrategy(opts, function (jwt_payload: JwtPayload, done: any) {
            User.findById({_id: jwt_payload.userId}, function (err: any, user: any) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        })
    );
};

export {configure};
