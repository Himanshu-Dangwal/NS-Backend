const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Level 4: Post Weather Alerts
async function saveWeatherAlert(alertDetails) {
  const data = await getDataFromDatabase();
  data.push(alertDetails);
  await saveDataToDatabase(data);
}

module.exports = {
  saveWeatherAlert
};
