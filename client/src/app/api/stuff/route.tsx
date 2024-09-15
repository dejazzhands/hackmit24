//the POST function is called when a POST request is made to the route.
//The request object contains the incoming request data, and the function returns a response object.

export async function POST(request: Request) {
    const response = await request.json();
    // await console.log(request.json());
    console.log(response);

    // Handle the incoming payload
    // get heart rate data object from response
    const heartRateData = response.data[0].heart_rate_data;

    console.log("This is heart rate data");
    // Log the heart rate data for debugging
    
    // Return a response to the client
    return new Response(
        JSON.stringify({
        message: "Heart rate data received",
        }),
        {
        headers: {
            "Content-Type": "application/json",
        },
        }
    );
}