async function sendAmpApi(
    event,
    userId,
    deviceId,
    eventProperties = {},
) {
    const payload = {
        api_key: "e56a40db8df5e06df7b09e1e4d6f461b",
        events: [
            {
                user_id: userId,
                device_id: deviceId,
                event_type: event,
                event_properties: eventProperties,
                time: Date.now(),
            },
        ],
    };

    try {
        const response = await fetch("https://api2.amplitude.com/2/httpapi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.status !== 200) {
            console.error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Amplitude API response:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}

sendAmpApi("Test Event", "test_user_id", "test_device_id", { key: "value" });
