import clc from "cli-color";
import dotenv from "dotenv";
import { restClient } from "@polygon.io/client-js";
dotenv.config();

console.log(clc.bgBlue.bold("Meow, reese is initializing!"));

// You can pass global options to fetch to add headers or configure requests
const globalFetchOptions = {
  method: "HEAD",
};
const rest = restClient(
  process.env.POLY_API_KEY,
  "https://api.polygon.io",
  globalFetchOptions
);

// You can also pass options to each individual call, each key will override keys from the options also set globally
// The signal option configures a timeout of 8 seconds for this call.
// The method option overrides the one we set globally.
const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 8000);

const overrideFetchOptions = {
  method: "GET",
  signal: controller.signal,
};

rest.stocks
  .previousClose("AAPL", {}, overrideFetchOptions)
  .then((data) => {
    clearTimeout(id);
    console.log(data);
  })
  .catch((e) => {
    console.error("An error happened:", e.message);
  });
