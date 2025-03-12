import type { Metadata } from "next";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import PostHogProvider from './providers/PostHogProvider';

export const metadata: Metadata = {
  title: "Martin Tejeda",
  description: "Product designer based in San Francisco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className="font-graphik antialiased">
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
