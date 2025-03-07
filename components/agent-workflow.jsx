"use client"

import { useState } from "react"
import { useWorkflow } from "@/context/workflow-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export default function AgentWorkflow() {
  const { agentPersona, userQuery } = useWorkflow()
  const [isLoading, setIsLoading] = useState(false)
  const [output, setOutput] = useState("")
  const [model, setModel] = useState("llama3.2:latest")
  const [error, setError] = useState("")

  const executeWorkflow = async () => {
    if (!agentPersona || !userQuery) {
      setError("Please define both agent persona and user query in the workflow designer")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Combine the agent persona with the user query
      const combinedPrompt = `${agentPersona}\n\nUser query: ${userQuery}`

      // Execute with locally runnable model via Ollama
      const { text } = await generateText({
        model: openai(model),
        prompt: combinedPrompt,
      })

      setOutput(text)
    } catch (err) {
      console.error("Error executing workflow:", err)
      setError(`Error: ${err.message || "Failed to execute workflow"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle>Workflow Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Local Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT 3.5 Turbo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Agent Persona</label>
              <Textarea value={agentPersona} readOnly className="bg-slate-800 border-slate-600 h-20" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">User Query</label>
              <Textarea value={userQuery} readOnly className="bg-slate-800 border-slate-600 h-20" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={executeWorkflow} disabled={isLoading || !agentPersona || !userQuery} className="w-full">
            {isLoading ? "Executing..." : "Execute Workflow"}
          </Button>
        </CardFooter>
      </Card>

      {error && <div className="p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">{error}</div>}

      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle>Agent Output</CardTitle>
        </CardHeader>
        <CardContent>
          {output ? (
            <div className="p-4 bg-slate-800 rounded-md whitespace-pre-wrap">{output}</div>
          ) : (
            <div className="text-slate-400 italic">Execute the workflow to see output here</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
