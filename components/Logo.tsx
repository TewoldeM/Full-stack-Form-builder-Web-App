import { FileText } from 'lucide-react';
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
    >
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-pink-600" />
        <span className="text-xl font-bold text-foreground">FormBuilder</span>
      </div>
    </Link>
  );
}

export default Logo