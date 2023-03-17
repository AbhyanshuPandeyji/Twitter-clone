// to handle the error when something in the app is not working - useful in many cases
export const handleError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
};
