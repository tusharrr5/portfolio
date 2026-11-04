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
          background: "#070c1a",
          color: "#edf1fa",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#9fabc8",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>{person.name}</span>
          <span>India · IST</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000, fontWeight: 800 }}>
            {hero.headline}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 40, fontSize: 26, color: "#9fabc8" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3ddc97", marginRight: 16 }} />
            {settings.availability.status}
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 120, background: "#27def7" }} />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
