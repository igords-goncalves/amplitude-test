"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/unified";
import { ampli } from "@/ampli";

export function AmplitudeBootstrap() {
  useEffect(() => {
    amplitude.initAll(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, {
      analytics: {
        autocapture: false,
      },
      sessionReplay: {
        sampleRate: 0.0, // Disable session replay by setting the sample rate to 0
      },
    });

    ampli.load({
      client: {
        apiKey: process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!,
        configuration: {
            autocapture: false,
        }
      }
    })
    console.info("Amplitude initialized");
  }, []);

  return null;
}
