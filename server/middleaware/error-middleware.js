// server/middlewares/error-midlleware.js
import ApiError from'../exceptions/api-error.js'
import error from "nuxt/dist/core/runtime/nitro/error.js";

export default async function (ctx) {
  try {

    // Если есть ошибка ApiError
    if (error instanceof ApiError) {
      return {
        status: error.status,
        body: { message: error.message, errors: error.errors },
      };
    }

    // Если другая ошибка
    return {
      status: 500,
      body: { message: 'Unexpected error' },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { message: 'Unexpected error' },
    };
  }
}
// export default function (err, req, res, next) {
//   console.log(err)
//   if(err instanceof ApiError) {
//     return res.status(err.status).json({message: err.message, errors: err.errors})
//   }
//   return res.status(500).json({message: 'unexpected error'})
// };