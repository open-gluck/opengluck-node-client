const { getUserdata, setUserdata } = require("..");

(async () => {
  await setUserdata("opengluck-node-client-tests", {
    foo: "bar",
    testvalue: 42,
  });
  const value = await getUserdata("opengluck-node-client-tests");
  console.log("Stored value:", value);
})();
