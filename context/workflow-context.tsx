"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface WorkflowContextType {
  agentPersona: string
  userQuery: string
  setAgentPersona: (persona: string) => void
  setUserQuery: (query: string) => void
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined)

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [agentPersona, setAgentPersona] = useState<string>(
    "You are a helpful AI assistant that specializes in technology and programming.",
  )
  const [userQuery, setUserQuery] = useState<string>("Explain how to use the AI SDK with Next.js")

  return (
    <WorkflowContext.Provider
      value={{
        agentPersona,
        userQuery,
        setAgentPersona,
        setUserQuery,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (context === undefined) {
    throw new Error("useWorkflow must be used within a WorkflowProvider")
  }
  return context
}

