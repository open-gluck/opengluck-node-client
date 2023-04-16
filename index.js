require("dotenv").config({ path: "~/.diably-apn" });
const https = require("https");

const getCgmCurrentDeviceProperties = (exports.getCgmCurrentDeviceProperties =
  async function getCgmCurrentDeviceProperties() {
    return new Promise((resolve, reject) => {
      const req = https.request(
        // https://opengluck.christopher.dev.api.makesuccess.io/userdata/cgm-current-device-properties/string
        `${process.env.OPENGLUCK_URL}/opengluck/userdata/cgm-current-device-properties`,
        (res) => {
          let chunks = [];
          res.on("data", (chunk) => {
            chunks.push(chunk);
          });
          res.on("end", () => {
            const data = Buffer.concat(chunks).toString();
            const properties = JSON.parse(data);
            resolve(properties);
          });
          res.on("error", reject);
        }
      );
      req.setHeader("Authorization", `Bearer ${process.env.OPENGLUCK_TOKEN}`);
      req.end();
    });
  });

exports.hasCgmRealTimeData = async function hasCgmRealTimeData() {
  return (await getCgmCurrentDeviceProperties())["has-real-time"];
};

