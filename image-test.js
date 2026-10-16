const bytes = $response.bodyBytes;

if (!bytes) {
  console.log("[IMAGE TEST] bodyBytes unavailable");
} else {
  const arr = new Uint8Array(bytes);

  const header = Array.from(arr.slice(0, 4))
    .map(x => x.toString(16).padStart(2, "0"))
    .join(" ");

  console.log("[IMAGE TEST] URL:", $request.url);
  console.log("[IMAGE TEST] SIZE:", arr.byteLength);
  console.log("[IMAGE TEST] HEADER:", header);
  console.log("[IMAGE TEST] JPEG:", header.startsWith("ff d8 ff"));
}

$done({});