import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quality Originals | Monte seu negócio",
  description:
    "Conceitos de empresas, identidades visuais e marcas pré-prontas para empreendedores que desejam começar com estrutura."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider>
          <ParticlesBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
