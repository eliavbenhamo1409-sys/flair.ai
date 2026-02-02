import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLAIR - Your Personal Stylist | הסטייליסט האישי שלך",
  description: "Decide what to wear in seconds. The app that turns your closet into a personal styling studio. | לבחור מה ללבוש - בשניות. האפליקציה שהופכת את הארון שלך לסטודיו אישי לסטיילינג.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Assistant:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
