"use client";

import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Optionally log the error to an external service or console
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <html>
      <body>
        {/* NextError is the default Next.js error page component. */}
        {/* Since the App Router does not expose status codes for errors, we pass 0 for a generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
