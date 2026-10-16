(async () => {
  try {
    // 1. 获取图片二进制
    const bytes = $response.bodyBytes;

    if (!bytes || bytes.byteLength === 0) {
      console.log("[UPLOAD] No image bytes");
      return;
    }

    // 2. 转换为 Uint8Array
    const uint8 = new Uint8Array(bytes);

    // 3. 验证图片数据
    const header = Array.from(uint8.slice(0, 4))
      .map(x => x.toString(16).padStart(2, "0"))
      .join(" ");

    console.log("[UPLOAD] URL: " + $request.url);
    console.log("[UPLOAD] Original size: " + uint8.byteLength);
    console.log("[UPLOAD] Header: " + header);
    console.log("[UPLOAD] JPEG: " + header.startsWith("ff d8 ff"));

    // 4. 上传到 Webhook.site
    const result = await $task.fetch({
      url: "https://webhook.site/0a8bdfd7-7e88-48f2-8936-436b478c0e23",
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream"
      },
      body: uint8
    });

    // 5. 输出上传结果
    console.log("[UPLOAD] Status: " + result.statusCode);
    console.log("[UPLOAD] Response: " + String(result.body).slice(0, 200));

  } catch (e) {
    console.log("[UPLOAD] Error: " + String(e));
  } finally {
    // 不修改原始图片响应
    $done({});
  }
})();
