const { getCurrentGlucose } = require("..");

(async () => {
  const current = await getCurrentGlucose();
  console.log("Current glucose:", current);
})();
