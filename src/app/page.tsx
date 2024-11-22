"use client"

import { useRouter } from "next/navigation"
import * as React from "react"

export default function NavigateToLogin() {
  const router = useRouter()

  React.useEffect(() => {
    // Navigate to the login route when the component is mounted
    router.push("/login")
  }, [router])

  return null // No need to render anything
}
