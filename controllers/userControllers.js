import User from "../modals/user.js";
import encrypt from "encryptjs";
import { idGenerator } from "generate-custom-id";
import axios from "axios";

export const register = async (req, res) => {
    try {
        const { name, email, password, accesstoken } = req.body;
        if (!name) return res.send("Name is required.");
        if (!email) return res.send("email is required.");
        if (!password) return res.send("Password is required.");

        const response = await User.find({ email }).exec();
        if (response.length) return res.send("Email already taken.");

        var secretpass = "pass";

        var encryptpass = encrypt.encrypt(password, secretpass, 256);
        console.log(encryptpass);
        const id = idGenerator("example", 4);
        const data = new User({
            name,
            email,
            password: encryptpass,
            accesstoken: id
        })
        await data.save();

        setTimeout(async () => {
            await User.updateOne({ email }, { $unset: { accesstoken: 1 } });
        }, 60 * 1000);
        return res.send("Registration Successful!");
    } catch (error) {
        return res.send(error);
    }
}


export const regeneratkey = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.send("email is required");
        if (!password) return res.send("password is required");

        const user = await User.find({ email }).exec();
        if (!user.length) return res.send("User not found");

        var secretpass = "pass";
        var decipherpass = encrypt.decrypt(user[0].password, secretpass, 256);

        if (decipherpass == password) {
            const id = idGenerator("example", 4);

            if (user[0].accesstoken) {
                return res.send("token already generated.")
            } else {
                await User.findOneAndUpdate({ email }, { accesstoken: id });

                setTimeout(async () => {
                    await User.updateOne({ email }, { $unset: { accesstoken: 1 } });
                }, 60 * 1000);
                return res.send("Key generated")
            }

            
        } else {
            return res.send("password not matched")
        }

    }
    catch (error) {
        return res.send(error);
    }
}


export const getimages = async (req, res) => {
    try {
        const { email, password, Movie } = req.body;
        if (!email) return res.send("Email is required");
        if (!password) return res.send("Password is required");

        const user = await User.find({ email }).exec();
        if (!user.length) return res.send("User not found");

        var secretpass = "pass";
        var decipherpass = encrypt.decrypt(user[0].password, secretpass, 256);

        if (decipherpass == password) {
            if (user[0].accesstoken != undefined) {
                // return res.send("user is allowed to access videos")
                const key = "k_333lvlms"
                const response = await axios.get(`https://imdb-api.com/en/API/Posters/${key}/${Movie}`);
                console.log(response.data,"response")
                return res.send(response.data.title);
            } else {
                return res.send("regenerate token");
            }

        } else {
            return res.send("Incorrect password.")
        }
    } catch (error) {
        return res.send(error);
    }
}
