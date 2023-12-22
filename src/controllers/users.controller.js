import { get, getByEmail} from "../services/users.services.js"
import CustomizedError from "../errors/customized.errors.js";
import { errorMessages } from "../errors/errors.enum.js";

export const getAllUsers = async (req, res) => {
    const users = await get();
    res.status(200).json({message: users})
};

export const getOneByEmail = async (req, res) => {
    const {email } = req.params;
    try {
        const user = await getByEmail(email);
        if(user){
            res.status(200).send({message: user})
        } else {
            CustomizedError.currentError(errorMessages.UNAUTENTICATED)
        }
    } catch (error) {
        res.send(error.message)
    }
};
