module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    semi: "off",
    "vue/attribute-hyphenation": ["error", "always"],
    "vue/require-default-prop": "error",
    "vue/require-prop-types": "error",
    "vue/attributes-order": "error",
    "vue/order-in-components": "error",
    "vue/no-use-v-if-with-v-for": false
  },
  parserOptions: {
    parser: "babel-eslint"
  }
}
