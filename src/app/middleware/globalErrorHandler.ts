// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { ErrorRequestHandler } from 'express';
// import { ZodError } from 'zod';
// import { TErrorSourse } from '../interface/error';
// import config from '../config';
// import { handleZodError } from '../errors/zodErrorValidator';
// import { handleMongooseError } from '../errors/mongooseErrorValidator';
// import { handleCastError } from '../errors/handleCastError';
// import { handleDuplicateError } from '../errors/handleDuplicateError';
// import AppError from '../errors/AppError';

// const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   let statusCode = err.statusCode || 500;
//   let message = err.message || 'something went wrong';

//   let errorSourses: TErrorSourse = [
//     {
//       path: '',
//       message: 'something went wrong',
//     },
//   ];

//   if (err instanceof ZodError) {
//     const simplyfiedError = handleZodError(err);
//     statusCode = simplyfiedError?.statusCode;
//     message = simplyfiedError?.message;
//     errorSourses = simplyfiedError?.errorSourse;
//   } else if (err?.name === 'ValidationError') {
//     const simplyfiedError = handleMongooseError(err);
//     statusCode = simplyfiedError?.statusCode;
//     message = simplyfiedError?.message;
//     errorSourses = simplyfiedError?.errorSourse;
//   } else if (err?.name === 'CastError') {
//     const simplyfiedError = handleCastError(err);
//     statusCode = simplyfiedError?.statusCode;
//     message = simplyfiedError?.message;
//     errorSourses = simplyfiedError?.errorSourse;
//   } else if (err?.code === 11000) {
//     const simplyfiedError = handleDuplicateError(err);
//     statusCode = simplyfiedError?.statusCode;
//     message = simplyfiedError?.message;
//     errorSourses = simplyfiedError?.errorSourse;
//   } else if (err instanceof AppError) {
//     statusCode = err?.statusCode;
//     message = err?.message;
//     errorSourses = [
//       {
//         path: '',
//         message: err.message,
//       },
//     ];
//   } else if (err instanceof Error) {
//     message = err?.message;
//     errorSourses = [
//       {
//         path: '',
//         message: err.message,
//       },
//     ];
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//     errorSourses,
//     err,
//     stack: config.NODE_ENV === 'development' ? err.stack : null,
//   });
// };

// export default globalErrorHandler;
