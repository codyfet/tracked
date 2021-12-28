import {IUser} from "./../interfaces/User";
import passport from "passport";
import {Strategy, VerifyCallback} from "passport-vkontakte";
import User from "../models/User";

// import verify from "./verify";
// import config from "../../../../../config";

interface VKUser {
    id: number; // 3378720
    username: string; // 'id3378720',
    displayName: string; // 'Alexander Volkov',
    name: {
        familyName: string; // "Volkov";
        givenName: string; // "Alexander"
    };
    gender: string; // 'male',
    profileUrl: string; // 'http://vk.com/id3378720',
    photos: VKPhoto[];
    provider: string; // 'vkontakte',
    _raw: Object; // {"response":[{"id":3378720,"first_name":"Alexander","last_name":"Volkov","can_access_closed":true,"is_closed":false,"sex":2,"screen_name":"id3378720","photo_200":"https:\\/\\/sun6-23.userapi.com\\/s\\/v1\\/if1\\/QsvFlGhhMLHczHcR39eDr4F3WgoDBHBrpOyRjesVpxpyCmCXoESbBZJQCyICYPjt4j9OOPpX.jpg?size=200x200&quality=96&crop=673,0,1628,1628&ava=1"}]}
    _json: VKJsonUserObject;
}

interface VKJsonUserObject {
    id: number; // 3378720
    first_name: string; // "Alexander"
    last_name: string; // "Volkov"
    deactivated: string;
    is_closed: boolean;
    can_access_closed: boolean;
    sex: number; // 2
    screen_name: string; // "id3378720";
    photo_200: string; // 'https://sun6-23.userapi.com/s/v1/if1/QsvFlGhhMLHczHcR39eDr4F3WgoDBHBrpOyRjesVpxpyCmCXoESbBZJQCyICYPjt4j9OOPpX.jpg?size=200x200&quality=96&crop=673,0,1628,1628&ava=1'
}

interface VKPhoto {
    value: string; // 'https://sun6-23.userapi.com/s/v1/if1/QsvFlGhhMLHczHcR39eDr4F3WgoDBHBrpOyRjesVpxpyCmCXoESbBZJQCyICYPjt4j9OOPpX.jpg?size=200x200&quality=96&crop=673,0,1628,1628&ava=1'
    type: string; // photo_200
}

const verify: VerifyCallback = async (profile: VKUser) => {
    console.log("verify");

    // const picture = profile.photos[0].value;
    // const username = profile.emails[0].value;
    // const data = {picture, vkontakteId: profile.id};

    // console.log("profile", profile);
    // console.log("username", username);
    // console.log("data", data);

    // let [user] = await User.find({username});
    const user = await User.findOne({vkId: profile.id});

    if (!user) {
        const newVkUser: IUser = {
            vkId: profile.id,

            email: "test@test.ru",
            password: "1234567",
            username: profile.displayName,
            favouriteMovies: [],
            records: [],
            isAdmin: false,
            image: profile.photos[0].value,
            place: "Tver",
        };
        const createdUser = await User.create(newVkUser);

        console.log("!!!!!!!createdUser", createdUser);

        return createdUser;
    }

    console.log("user already exists!", user);

    return user;

    // user = user ? await User.update(user._id, data) : await User.create({username, ...data});

    // console.log("user", user);

    // return toJSON(user);
};

export const authenticateVkontakte = passport.authenticate("vkontakte");

export const callbackVkontakte = [
    passport.authenticate("vkontakte", {
        session: false,
        successRedirect: "/",
        failureRedirect: "/login",
    }),
    // (req: any, res: any) => res.redirect("/"),
];

export const vkontakteStrategy = () =>
    new Strategy(
        {
            clientID: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_CLIENT_SECRET,
            callbackURL: "https://trackedapp.herokuapp.com/vkontakte/callback",
            profileFields: ["email"],
            // scope: "email",
        },
        async (accessToken, refreshToken, params, profile, done) => {
            console.log("accessToken", accessToken);
            console.log("refreshToken", refreshToken);
            console.log("params", params);
            console.log("profile", profile);
            console.log("done", done);

            // // if (params.email) {
            // //     profile.emails = [{value: params.email}];
            // // }

            // const user = await User.findOne({vkId: parseInt(profile.id)});

            // if (!user) {
            //     const newVkUser: IUser = {
            //         vkId: parseInt(profile.id),

            //         email: "test@test.ru",
            //         password: "1234567",
            //         username: profile.displayName,
            //         favouriteMovies: [],
            //         records: [],
            //         isAdmin: false,
            //         image: profile.photos[0].value,
            //         place: "Tver",
            //     };
            //     const createdUser = await User.create(newVkUser);

            //     console.log("!!!!!!!createdUser", createdUser);

            //     // return createdUser;

            //     done(null, user);
            // }

            // console.log("user already exists!", user);

            // // return user;

            // // cb(null, await verify(profile));
            // done(null, user);

            const _profile = JSON.parse(JSON.stringify(profile));

            console.log("_profile", _profile);

            _profile.emails = [{value: params.email}];
            process.nextTick(() => {
                done(null, _profile);
            });
        }
    );
