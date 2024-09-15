import { NextApiRequest } from "next";
import getData from "./suno";

const generateUrl = "https://studio-api.suno.ai/api/external/generate/";
const getUrl = "https://studio-api.suno.ai/api/external/clips/?ids=";

const payload = (heartRateData: any) => {
  return{topic: "a running song with no lyrics to motivate",
  tags: "spiderman",
  heartRateData
  }
};

export async function POST(request: Request) {
  // const {isSpiderman, request.json()
  try {
    const heartRateData = await getData();
    // if it works
    console.log("This is heart rate data:", heartRateData);

    // Check if heart rate data is available
    if (!heartRateData) {
      return new Response(
        JSON.stringify({ message: "Failed to retrieve heart rate data" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const response = await fetch(generateUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.SUNO_API_KEY}`,
        "content-type": "text/plain;charset=UTF-8",
      },
      body: JSON.stringify(payload(heartRateData)),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(response);
      return Response.json({ message: "API failed" });
    }

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" });
  }
}

export async function GET(request: NextApiRequest) {
  const { id } = request.query;
  try {
    const response = await fetch(getUrl + id, {
      method: "GET",
      headers: {
        authorization: `Bearer ${process.env.SUNO_API_KEY}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(response);
      return Response.json({ message: "API failed" });
    }

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" });
  }
}
