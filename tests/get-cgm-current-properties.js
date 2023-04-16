const { getCgmCurrentDeviceProperties, hasCgmRealTimeData } = require("..");

(async () => {
  const properties = await getCgmCurrentDeviceProperties();
  console.log("Properties:", properties);
  console.log("Has real time data:", await hasCgmRealTimeData());
})();
