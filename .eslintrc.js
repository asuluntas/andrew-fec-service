
module.exports = {
  extends: ["airbnb"],
  plugins: [
    "react-hooks", "react"
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  env: {
    jest: true
  }
}
