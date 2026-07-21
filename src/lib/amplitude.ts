"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { ampli } from "@/ampli";

export function AmplitudeBootstrap() {
    useEffect(() => {
        amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, undefined, {
            autocapture: false,
            serverUrl: "/api/ampli-proxy",
            transport: "fetch"
        });
        
        ampli.load({
            client: {
                instance: amplitude,
                configuration: {
                    serverUrl: "/api/ampli-proxy",
                    transport: "fetch"
                }
            },
        });
        console.info(
            "Amplitude client instance should be the same as the one initialized",
        );
    }, []);

    return null;
}
