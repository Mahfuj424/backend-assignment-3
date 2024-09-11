/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";

const paymentConfirmation = catchAsync(async (req, res, next) => {
  const { transaction_id } = req.query;

    const result = await paymentServices.confirmationService(
        transaction_id as string
    );
  res.send(`<h1>payment succes</h1>`);
});
export const paymentControllers = {
  paymentConfirmation,
};
