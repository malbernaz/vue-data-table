module.exports = {
  presets: ["@vue/app"],
  plugins: [["@grafoo/babel-plugin", { idFields: ["id"], schema: "schema.graphql" }]]
};
