import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Linzhen Zhu",
    template: "%s · Linzhen Zhu",
  },
  metadataBase: new URL("https://linzhenzhu.me"),
  description: "Linzhen Zhu is a Ph.D. Candidate at the University of Michigan, researching optical and tactile sensing in the Ambient Intelligence Lab. Publications, projects, and CV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
