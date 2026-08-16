import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import FormData from "form-data";
import { Readable } from "stream";

const STREAMHG_API_KEY =
  process.env.STREAMHG_API_KEY;


async function isAdmin() {

  const cookieStore =
    await cookies();

  const session =
    cookieStore.get(
      "admin_session"
    );

  return Boolean(session);
}


export async function POST(request) {

  if (!(await isAdmin())) {

    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }


  try {

    const incoming =
      await request.formData();


    const video =
      incoming.get("video");

    const snapshot =
      incoming.get("snapshot");

    const title =
      incoming.get("file_title");

    const description =
      incoming.get("file_descr");


    if (!video) {

      return NextResponse.json(
        {
          error:
            "Video file is required.",
        },
        {
          status: 400,
        }
      );
    }


    // Get StreamHG upload server

    const serverResponse =
      await axios.get(
        "https://streamhgapi.com/api/upload/server",
        {
          params: {
            key: STREAMHG_API_KEY,
          },
        }
      );


    const uploadUrl =
      serverResponse.data.result;


    const form =
      new FormData();


    form.append(
      "key",
      STREAMHG_API_KEY
    );


    const videoBuffer =
      Buffer.from(
        await video.arrayBuffer()
      );


    form.append(
      "file",
      videoBuffer,
      {
        filename:
          video.name ||
          "movie.mp4",
        contentType:
          video.type ||
          "video/mp4",
      }
    );


    if (title) {

      form.append(
        "file_title",
        title
      );

    }


    if (description) {

      form.append(
        "file_descr",
        description
      );

    }


    form.append(
      "file_public",
      "1"
    );


    if (snapshot) {

      const snapshotBuffer =
        Buffer.from(
          await snapshot.arrayBuffer()
        );


      form.append(
        "snapshot",
        snapshotBuffer,
        {
          filename:
            snapshot.name ||
            "thumbnail.jpg",
          contentType:
            snapshot.type ||
            "image/jpeg",
        }
      );

    }


    const uploadResponse =
      await axios.post(
        uploadUrl,
        form,
        {
          headers:
            form.getHeaders(),

          maxContentLength:
            Infinity,

          maxBodyLength:
            Infinity,
        }
      );


    return NextResponse.json({
      success: true,
      response:
        uploadResponse.data,
    });


  } catch (error) {

    console.error(
      "ADMIN UPLOAD ERROR:",
      error.response?.data ||
      error.message
    );


    return NextResponse.json(
      {
        error:
          error.response?.data ||
          "Upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}