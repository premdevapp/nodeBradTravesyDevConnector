if (process.env.NODE_ENV === "production") {
  export const keys = import("./keys_prod.mjs");
} else {
  export const keys = import("./keys_dev.mjs");
}
