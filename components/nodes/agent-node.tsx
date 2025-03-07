"use client"

import { useState } from "react"
import { Handle, Position } from "reactflow"

export default function AgentNode({ data, id }) {
  const [persona, setPersona] = useState(data.persona || "")

  const handleChange = (e) => {
    const newPersona = e.target.value
    setPersona(newPersona)
    data.onChange?.(id, "persona", newPersona)
  }

  return (
    <div className="bg-blue-900 p-4 rounded-lg shadow-lg w-64">
      <div className="font-semibold text-white mb-2">{data.label}</div>
      <textarea
        value={persona}
        onChange={handleChange}
        className="w-full h-24 p-2 text-sm bg-blue-800 text-white border border-blue-700 rounded"
        placeholder="Enter agent persona..."
      />
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  )
}

