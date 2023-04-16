require("dotenv").config({ path: "~/.diably-apn" });
const https = require("https");

const getUserdata = (exports.getUserdata = async function getUserdata(
  userdata
) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      `${process.env.OPENGLUCK_URL}/opengluck/userdata/${userdata}`,
      (res) => {
        let chunks = [];
        res.on("data", (chunk) => {
          chunks.push(chunk);
        });
        res.on("end", () => {
          const data = Buffer.concat(chunks).toString();
          resolve(JSON.parse(data));
        });
        res.on("error", reject);
      }
    );
    req.setHeader("Authorization", `Bearer ${process.env.OPENGLUCK_TOKEN}`);
    req.end();
  });
});

exports.setUserdata = async function setUserdata(userdata, value) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      `${process.env.OPENGLUCK_URL}/opengluck/userdata/${userdata}`,
      { method: "PUT" },
      (res) => {
        let chunks = [];
        res.on("data", (chunk) => {
          chunks.push(chunk);
        });
        res.on("end", () => {
          if (res.statusCode !== 201) {
            reject(new Error(`Unexpected status code: ${res.statusCode}`));
          }
          resolve();
        });
        res.on("error", reject);
      }
    );
    req.setHeader("Authorization", `Bearer ${process.env.OPENGLUCK_TOKEN}`);
    req.setHeader("Content-type", "application/json");
    req.end(JSON.stringify(value));
  });
};

const getCgmCurrentDeviceProperties = (exports.getCgmCurrentDeviceProperties =
  async function getCgmCurrentDeviceProperties() {
    return await getUserdata("cgm-current-device-properties");
  });

exports.hasCgmRealTimeData = async function hasCgmRealTimeData() {
  return (await getCgmCurrentDeviceProperties())["has-real-time"];
};

exports.getCurrentGlucose = async function getCurrentGlucose() {
  return new Promise((resolve, reject) => {
    const req = https.request(
      `${process.env.OPENGLUCK_URL}/opengluck/glucose/current`,
      (res) => {
        let chunks = [];
        res.on("data", (chunk) => {
          chunks.push(chunk);
        });
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Unexpected status code: ${res.statusCode}`));
          }
          resolve(JSON.parse(Buffer.concat(chunks).toString("utf-8")));
        });
        res.on("error", reject);
      }
    );
    req.setHeader("Authorization", `Bearer ${process.env.OPENGLUCK_TOKEN}`);
    req.setHeader("Content-type", "application/json");
    req.end();
  });
};
