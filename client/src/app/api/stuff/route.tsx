import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const response = await request.json();
    console.log(response);

    // Handle the incoming payload
    const heartRateData = response.data[0].heart_rate_data;

    console.log("This is heart rate data:", heartRateData);

    // Define the storage path
    const storagePath = path.join(process.cwd(), 'data', 'heart_rate_data.json');

    // Ensure the directory exists
    await fs.promises.mkdir(path.dirname(storagePath), { recursive: true });

    // Write the heart rate data to a file
    const dataToSave = JSON.stringify(heartRateData, null, 2);
    await fs.promises.writeFile(storagePath, dataToSave, 'utf8');

    // Log success message
    console.log(`Heart rate data successfully written to ${storagePath}`);

    // Return a response to the client
    return new Response(
      JSON.stringify({
        message: "Heart rate data saved successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Error processing request' }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}