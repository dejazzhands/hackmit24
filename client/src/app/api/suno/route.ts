import { NextApiRequest } from "next";

const generateUrl = "https://studio-api.suno.ai/api/external/generate/";
const getUrl = "https://studio-api.suno.ai/api/external/clips/?ids=";

const payload = {
  topic: "a running song with no lyrics to motivate",
  tags: "spiderman",
};

export async function POST(request: Request) {
  try {
    const response = await fetch(generateUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.SUNO_API_KEY}`,
        "content-type": "text/plain;charset=UTF-8",
      },
      body: JSON.stringify(payload),
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
