import "./globals.css";

export const metadata = {
  title: "Joyce Waithera Okore — Software Engineer",
  description:
    "Portfolio of Joyce Waithera Okore — Software Engineer (React, Next.js, TypeScript).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
