import { ImageResponse } from "next/og";
import { site } from "@/data/portfolio";

export const alt = `${site.name}: Frontend Developer transitioning into AI Engineering`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(circle at 20% 10%, #2e1065 0%, #07070d 55%)",
          color: "#ececf4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#22d3ee", letterSpacing: 2 }}>PORTFOLIO</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16 }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 12, color: "#c4b5fd" }}>Frontend Developer → AI Engineer</div>
        <div style={{ fontSize: 28, marginTop: 36, color: "#a3a3b8" }}>React · Next.js · TypeScript · Python · LLM agents</div>
      </div>
    ),
    size,
  );
}
