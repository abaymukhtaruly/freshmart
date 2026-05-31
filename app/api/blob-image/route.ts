import { NextRequest, NextResponse } from "next/server";
import { getDownloadUrl } from "@vercel/blob";

export async function GET(request: NextRequest) {
  const blobUrl = request.nextUrl.searchParams.get("url");

  if (!blobUrl) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    );
  }

  try {
    // Verify it's a valid Vercel blob URL
    if (!blobUrl.includes("blob.vercel-storage.com")) {
      return NextResponse.json(
        { error: "Invalid blob URL" },
        { status: 400 }
      );
    }

    // Get the signed download URL
    const signedUrl = await getDownloadUrl(blobUrl);

    // Fetch the image from the signed URL
    const response = await fetch(signedUrl);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: response.status }
      );
    }

    // Return the image with proper headers
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": response.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Blob image error:", error);
    return NextResponse.json(
      { error: "Failed to serve image" },
      { status: 500 }
    );
  }
}
