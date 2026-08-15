
import axios from "axios";

export async function GET() {
  try {
    const apiKey = process.env.STREAMHG_API_KEY;

    if (!apiKey) {
      console.error("STREAMHG_API_KEY is missing");

      return Response.json(
        { error: "STREAMHG_API_KEY is missing" },
        { status: 500 }
      );
    }

    const response = await axios.get(
      `https://streamhgapi.com/api/file/list?key=${apiKey}`
    );

    console.log("StreamHG status:", response.status);
    console.log("StreamHG files:", response.data.result?.files?.length);

    return Response.json(response.data.result.files);
  } catch (error) {
    console.error("========== STREAMHG ERROR ==========");
    console.error("Message:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("====================================");

    return Response.json(
      {
        error: "Failed to fetch video list",
        message: error.message,
        streamhgStatus: error.response?.status || null,
        streamhgResponse: error.response?.data || null,
      },
      { status: 500 }
    );
  }
}