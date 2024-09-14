/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";

const paymentConfirmation = catchAsync(async (req, res, next) => {
  const { transaction_id } = req.query;

  const result = await paymentServices.confirmationService(
    transaction_id as string
  );

  // Success template with 2-second redirect
  const successPage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Success</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
        }
        .container {
          text-align: center;
        }
        h1 {
          color: #28a745;
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Payment Success</h1>
        <p>Thank you for your payment. You will be redirected to the homepage shortly.</p>
      </div>
      <script>
        // Redirect to homepage after 2 seconds
        setTimeout(() => {
          window.location.href = "http://localhost:5173/my-bookings";
        }, 4000);
      </script>
    </body>
    </html>
  `;

  // Send the success page
  res.send(successPage);
});

export const paymentControllers = {
  paymentConfirmation,
};
