import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Yash Goyal | Enterprise Technology & Strategy', description: 'The professional profile of Yash Goyal.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}