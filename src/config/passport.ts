import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User } from '../models/User';
import {Request, Response, NextFunction} from 'express'

const notAuthrizedJson = { status: 401, message: 'Não autorizado' };

passport.use(new BasicStrategy( async (email, password, done) => {

    if (email && password) {
        const user = await User.findOne({
            where: { email, password }
        });

        if(user) {
            return done(null, user);
        };
    };

    return done(notAuthrizedJson, false);
}));

export const priveteRoute = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('basic', (err: any, user: any) => {
        req.user = user;
        return user ? next() : next(notAuthrizedJson);
    })(req, res, next);
}

export default passport;