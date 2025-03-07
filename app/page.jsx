import { Suspense } from "react"
import AgentWorkflow from "../components/agent-workflow"
import WorkflowDesigner from "../components/workflow-designer"
import { WorkflowProvider } from "../context/workflow-context"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Agent Orchestrator</h1>
        <p className="text-lg mb-8">Design and execute AI agent workflows with locally runnable models</p>

        <WorkflowProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Workflow Designer</h2>
              <Suspense fallback={<div>Loading designer...</div>}>
                <WorkflowDesigner />
              </Suspense>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Agent Execution</h2>
              <Suspense fallback={<div>Loading agent...</div>}>
                <AgentWorkflow />
              </Suspense>
            </div>
          </div>
        </WorkflowProvider>
      </div>
    </main>
  )
}

