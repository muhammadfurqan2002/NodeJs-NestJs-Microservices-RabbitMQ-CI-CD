// non-blocking io operation, single threaded

const fs = require("fs");
const crypto = require("crypto");

console.log("1.start script");

setTimeout(() => {
  console.log("2 sec times out callback (macrotask)");
}, 0);

setTimeout(() => {
  console.log("3 sec times out callback (macrotask)");
}, 0);

setImmediate(() => {
  console.log("4 sec times out callback (check)");
});

Promise.resolve().then(() => {
  console.log("5 sec times out callback (microtask)");
});

process.nextTick(() => {
  console.log("6 sec times out callback (microtask)");
});

fs.readFile(__filename, () => {
  console.log("7 FILE READ OPERATION (I/O CALLBACK)");
});

crypto.pbkdf2("1234567", "salt", 10000, 64, "sha512", (err, key) => {
  if (err) throw err;
  console.log("8 crypto (macrotask)");
});

console.log("9 Script Ends here");
