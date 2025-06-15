'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import * as styles from "./page.css";

export default function Home() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (status === 'authenticated') {
    return null // Will redirect
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Family App!</h1>
      <p className={styles.description}>
        Keep track of your family's books, movies, and shows all in one place.
        Share recommendations, track progress, and coordinate your family's entertainment.
      </p>
      <div className={styles.buttonContainer}>
        <Link 
          href="/auth/signup"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Get Started
        </Link>
        <Link 
          href="/auth/signin"
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
