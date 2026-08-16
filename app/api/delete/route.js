import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

const STREAMHG_API_KEY = process.env.STREAMHG_API_KEY;

async function isAdmin() {
  const cookieStore = await cookies();

  const session = cookieStore.get("admin_session");

  return Boolean(session);
}

export async function DELETE(request) {
  // Check authentication
  if (!(await isAdmin())) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body = await request.json();

    const { file_code } = body;

    if (!file_code) {
      return NextResponse.json(
        {
          success: false,
          error: "file_code is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!STREAMHG_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "STREAMHG_API_KEY is missing",
        },
        {
          status: 500,
        }
      );
    }

    console.log("Deleting StreamHG file:", file_code);

    const response = await axios.get(
      "https://streamhgapi.com/api/file/delete",
      {
        params: {
          key: STREAMHG_API_KEY,
          file_code: file_code,
        },
      }
    );

    console.log(
      "StreamHG delete response:",
      response.data
    );

    return NextResponse.json({
      success: true,
      response: response.data,
    });
  } catch (error) {
    console.error(
      "ADMIN DELETE ERROR:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error.response?.data ||
          error.message ||
          "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}