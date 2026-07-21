import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // const amplitudeUrl = "https://amplitude.com";
        const amplitudeUrl = "https://api2.amplitude.com/2/httpapi";

        const body = await request.text();

        const amplitudeResponse = await fetch(amplitudeUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });

        const responseData = await amplitudeResponse.json();
        console.log("Amplitude response:", responseData);
        
        return NextResponse.json(responseData, {
            status: amplitudeResponse.status,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to proxy request to Amplitude, " + error },
            { status: 500 },
        );
    }
}
