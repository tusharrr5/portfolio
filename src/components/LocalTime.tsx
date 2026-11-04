"use client";

import { useEffect, useState } from "react";
import { person } from "@/content/site";

/** Shows the current time where you are, e.g. "10:42 pm IST". */
export function LocalTime({ suffix = true }: { suffix?: boolean }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: person.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>
      {time ? `${time} ` : ""}
      {person.timezoneLabel}
      {suffix ? " local time" : ""}
    </span>
  );
}
