"use client"

import { useState } from "react"
import { Handle, Position } from "reactflow"

export default function QueryNode({ data, id }) {
  const [query, setQuery] = useState(data.query || "")

  const handleChange = (e) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    data.onChange?.(id, "query", newQuery)
  }

  return (
    <div className="bg-purple-900 p-4 rounded-lg shadow-lg w-64">
      <div className="font-semibold text-white mb-2">{data.label}</div>
      <textarea
        value={query}
        onChange={handleChange}
        className="w-full h-24 p-2 text-sm bg-purple-800 text-white border border-purple-700 rounded"
        placeholder="Enter user query..."
      />
      <Handle type="target" position={Position.Top} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  )
}

