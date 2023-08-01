export const HttpError = (status, message) => {
    const error = new Error(message, status);
    error.status = status
    return error
}