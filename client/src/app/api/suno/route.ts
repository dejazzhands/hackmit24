import getData from "./suno";
import { NextRequest } from "next/server";

const generateUrl = "https://studio-api.suno.ai/api/external/generate/";
const getUrl = "https://studio-api.suno.ai/api/external/clips/?ids=";

interface HeartRateData {
  minString: string;
  maxString: string;
}

const payload = (heartRateData: HeartRateData) => {
  return {
    topic: `a running song with loud bass to motivate you at a ${heartRateData.maxString} speed `,
    tags: "spiderman",
  };
};

export async function POST() {
  // const {isSpiderman, request.json()
  try {
    const bpmData = await getData();

    console.log("This is heart rate data:", bpmData);

    if (!bpmData)
      return Response.json({ message: "No heart rate data" }, { status: 400 });

    const response = await fetch(generateUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.SUNO_API_KEY}`,
        "content-type": "text/plain;charset=UTF-8",
      },
      body: JSON.stringify(payload(bpmData)),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(response);
      return Response.json({ message: "API failed" });
    }

    return Response.json({
      id: data,
      minBPM: bpmData.minBPM,
      maxBPM: bpmData.maxBPM,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" });
  }
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

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
