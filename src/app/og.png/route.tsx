import { ImageResponse } from "next/og";
import { hero, person, settings } from "@/content/site";

// Rendered once at build time to /og.png (the Open Graph / social share image).
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f1ea",
          color: "#1b1a17",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#5c574e",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>{person.name}</span>
          <span>India · IST</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            {hero.headline}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 40, fontSize: 26, color: "#5c574e" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#2f5d3a", marginRight: 16 }} />
            {settings.availability.status}
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 120, background: "#b0391c" }} />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
