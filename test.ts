const bcrypt = require("bcryptjs");

(async function main() {
  const input = "helloworld!";

  const hash = await bcrypt.hash(input, 10);

  const x = await bcrypt.compare(input, hash);

  console.log("compare", x, hash);
})();
