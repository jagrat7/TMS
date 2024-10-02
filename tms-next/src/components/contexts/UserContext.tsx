'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the shape of your user object
type User = {
  id: string
  // Add other user properties here
}

// Define the shape of your context
type UserContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Create a provider component
export function UserProvider({ children, initialUser }: { children: ReactNode, initialUser: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Create a custom hook to use the context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}