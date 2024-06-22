import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";


async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(6000, () => {
      console.log(`app is listening on port ${6000}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
