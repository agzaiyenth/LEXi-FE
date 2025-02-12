'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { MainNav } from '@/components/main-nav'
import { Sidebar } from '@/components/sidebar'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })



interface ProtectedLayoutProps {
  children: React.ReactNode;
}

// A component that checks authentication and redirects if not logged in.
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [token, loading, router]);

  // While loading, render a spinner or loading state.
  if (loading) {
    return <div>Loading...</div>;
  }

  // Once loaded, if there's no token, you might return null (or even a fallback)
  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className} suppressHydrationWarning>
      <AuthProvider>
      <ProtectedLayout>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-grow justify-center">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
        </ProtectedLayout>
    </AuthProvider>
      </body>
    </html>
  )
}