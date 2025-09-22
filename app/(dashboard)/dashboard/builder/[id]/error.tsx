"use client"
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import React, { useEffect } from 'react'

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error(error)
  },[error])
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4">
      <h1 className="text-destructive text-4xl">Something went wrong</h1>
      <Button asChild>
        <Link href='/'>Go Back to Home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage