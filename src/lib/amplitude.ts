"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { ampli } from "@/ampli";

export function AmplitudeBootstrap() {
    useEffect(() => {
        amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, undefined, {
            autocapture: false,
        });

        ampli.load({
            client: {
                instance: amplitude,
            },
        });

        // const indentifyEvent = new amplitude.Identify();
        // indentifyEvent.unset("ampli_test");

        // amplitude.identify(indentifyEvent);

        console.info(
            "Amplitude client instance should be the same as the one initialized",
        );
    }, []);

    return null;
}
