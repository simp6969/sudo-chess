import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: "700",
  subsets: ["latin"],
  variable: ["poppins"],
});
export const metadata = {
  title: "sudo chess",
  description: "simple chess app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
