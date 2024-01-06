//  exceptions/apiError.js

//ApiError - пользовательское исключение для создания ошибок с определенным статусом,
// сообщением и, при необходимости, дополнительными ошибками
class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

// static функции можно использовать не создавая экземпляр класса
  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}
export default ApiError
// const ApiError = (status, message, errors = []) => {
//   const error = new Error(message);
//   error.status = status;
//   error.errors = errors;
//
//   return error;
// }
//
// ApiError.UnauthorizedError = () => {
//   return ApiError(401, 'User is not authorized');
// };
//
// ApiError.BadRequest = (message, errors = []) => {
//   return ApiError(400, message, errors);
// };
