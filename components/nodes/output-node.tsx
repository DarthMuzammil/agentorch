"use client"

import { Handle, Position } from "reactflow"

export default function OutputNode({ data }) {
  return (
    <div className="bg-green-900 p-4 rounded-lg shadow-lg w-64">
      <div className="font-semibold text-white mb-2">{data.label}</div>
      <div className="bg-green-800 p-2 rounded border border-green-700 text-sm text-white">
        Output will appear in the execution panel
      </div>
      <Handle type="target" position={Position.Top} id="a" />
    </div>
  )
}

