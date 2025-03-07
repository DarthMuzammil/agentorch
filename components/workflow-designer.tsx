"use client"
import ReactFlow, { Background, Controls, MiniMap, addEdge, useNodesState, useEdgesState } from "reactflow"
import "reactflow/dist/style.css"
import { useWorkflow } from "@/context/workflow-context"
import AgentNode from "./nodes/agent-node"
import QueryNode from "./nodes/query-node"
import OutputNode from "./nodes/output-node"

const nodeTypes = {
  agentNode: AgentNode,
  queryNode: QueryNode,
  outputNode: OutputNode,
}

const initialNodes = [
  {
    id: "agent-1",
    type: "agentNode",
    position: { x: 250, y: 50 },
    data: {
      label: "Agent Persona",
      persona: "You are a helpful AI assistant that specializes in technology and programming.",
    },
  },
  {
    id: "query-1",
    type: "queryNode",
    position: { x: 250, y: 200 },
    data: {
      label: "User Query",
      query: "Explain how to use the AI SDK with Next.js",
    },
  },
  {
    id: "output-1",
    type: "outputNode",
    position: { x: 250, y: 350 },
    data: { label: "Output" },
  },
]

const initialEdges = [
  { id: "e1-2", source: "agent-1", target: "query-1" },
  { id: "e2-3", source: "query-1", target: "output-1" },
]

export default function WorkflowDesigner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const { setAgentPersona, setUserQuery } = useWorkflow()

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds))

  const onNodeChange = (nodeId, key, value) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          if (node.type === "agentNode" && key === "persona") {
            setAgentPersona(value)
          } else if (node.type === "queryNode" && key === "query") {
            setUserQuery(value)
          }

          return {
            ...node,
            data: {
              ...node.data,
              [key]: value,
            },
          }
        }
        return node
      }),
    )
  }

  return (
    <div className="h-[500px] border border-slate-700 rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#334155" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

