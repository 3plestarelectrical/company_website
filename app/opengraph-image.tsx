import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "3ple Star Electrical Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0f14 0%, #0f1a2c 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 72,
            fontWeight: 800,
            color: "#e7eefb",
          }}
        >
          <span>3</span>
          <span style={{ color: "#f7c948" }}>ple</span>
          <span>Star</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#99a7bd" }}>
          Solar &amp; Electrical Solutions
        </div>
        <div
          style={{
            marginTop: 40,
            width: 120,
            height: 6,
            borderRadius: 999,
            background: "#1fa971",
          }}
        />
      </div>
    ),
    { ...size }
  );
}