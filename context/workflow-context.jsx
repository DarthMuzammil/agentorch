"use client"

import { createContext, useContext, useState } from "react"

const WorkflowContext = createContext(undefined)

export function WorkflowProvider({ children }) {
  const [agentPersona, setAgentPersona] = useState(
    "You are a helpful AI assistant that specializes in technology and programming.",
  )
  const [userQuery, setUserQuery] = useState("Explain how to use the AI SDK with Next.js")

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

