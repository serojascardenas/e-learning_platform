export const getErrorMessage = error => error && error.errors ? error.errors.map(error => error.message) : error;