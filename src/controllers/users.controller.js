import { get, getByEmail} from "../services/users.services.js"

export const getAllUsers = async (req, res) => {
    const users = await get();
    res.status(200).json({message: users})
};

export const getOneByEmail = async (req, res) => {
    const {email } = req.params;
    const user = await getByEmail(email);
    res.status(200).json({message: user})
};
