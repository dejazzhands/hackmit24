import fs from "fs";
import path from "path";

function mapBPMToString(bpm: number) {
  if (bpm <= 70) {
    return "slow";
  } else if (bpm <= 100) {
    return "normal";
  } else {
    return "fast";
  }
}

export default async function getData() {
  try {
    const storagePath = path.join(
      process.cwd(),
      "data",
      "heart_rate_data.json"
    );

    const data = await fs.promises.readFile(storagePath, "utf8");
    const heartRateData = JSON.parse(data);

    console.log("Read heart rate data: ", heartRateData);

    return {
      minString: mapBPMToString(heartRateData.summary.min_hr_bpm),
      maxString: mapBPMToString(heartRateData.summary.max_hr_bpm),
      minBPM: heartRateData.summary.min_hr_bpm,
      maxBPM: heartRateData.summary.max_hr_bpm,
    };
  } catch {
    console.error("Error reading heart rate data");
  }
}
