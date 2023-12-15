export default class CustomizedError {
    static currentError(msg){
        throw new Error(`${msg}`);
    }
}
