import getData from "../suno/suno";


export async function GET() {
    const bpmData = await getData()

    if (!bpmData) {
        return Response.json({ message: "No heart rate data" }, { status: 400 })
    }
    return Response.json(bpmData)
}