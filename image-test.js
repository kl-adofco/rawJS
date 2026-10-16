(async () => {
  try {
    const bytes = $response.bodyBytes;

    if (!bytes || bytes.byteLength === 0) {
      console.log("[UPLOAD] No image bytes");
      return;
    }

    console.log("[UPLOAD] Original size: " + bytes.byteLength);

    const result = await $task.fetch({
      url: "https://webhook.site/0a8bdfd7-7e88-48f2-8936-436b478c0e23",
      method: "POST",
      headers: {
        "Content-Type": "image/jpeg"
      },
      body: bytes
    });

    console.log("[UPLOAD] Status: " + result.statusCode);
    console.log("[UPLOAD] Response: " + result.body);

  } catch (e) {
    console.log("[UPLOAD] Error: " + String(e));
  } finally {
    $done({});
  }
})();
