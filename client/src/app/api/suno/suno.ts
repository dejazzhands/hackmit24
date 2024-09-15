import fs from 'fs';
import path from 'path';

export default async function getData() {
  try {
    // Define the storage path
    const storagePath = path.join(process.cwd(), 'data', 'heart_rate_data.json');

    // Read the heart rate data from the file
    const data = await fs.promises.readFile(storagePath, 'utf8');
    const heartRateData = JSON.parse(data);

    // Log the heart rate data for debugging
    console.log("Read heart ratAe data:", heartRateData);
    return heartRateData;
  }
  catch {
    console.error('Error reading heart rate data');
  }
}