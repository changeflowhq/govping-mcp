#!/usr/bin/env node

// GovPing MCP Server - stdio bridge to Streamable HTTP endpoint
// Usage: npx @govping/mcp-server

const BASE_URL = process.env.GOVPING_MCP_URL || "https://changeflow.com/govping/mcp";

let pending = 0;
let closed = false;

process.stdin.setEncoding("utf8");

let buffer = "";
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let idx;
  while ((idx = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (line) dispatch(line);
  }
});

process.stdin.on("end", () => {
  if (buffer.trim()) dispatch(buffer.trim());
  closed = true;
  if (pending === 0) process.exit(0);
});

async function dispatch(line) {
  pending++;
  let request;
  try {
    request = JSON.parse(line);
  } catch {
    write({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    pending--;
    return;
  }

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json, text/event-stream" },
      body: JSON.stringify(request),
    });
    const text = await res.text();

    if (res.headers.get("content-type")?.includes("text/event-stream")) {
      for (const l of text.split("\n")) {
        if (l.startsWith("data: ")) write(null, l.slice(6));
      }
    } else {
      write(null, text);
    }
  } catch (err) {
    write({ jsonrpc: "2.0", id: request?.id, error: { code: -32000, message: err.message } });
  }

  pending--;
  if (closed && pending === 0) process.exit(0);
}

function write(obj, raw) {
  process.stdout.write((raw || JSON.stringify(obj)) + "\n");
}
