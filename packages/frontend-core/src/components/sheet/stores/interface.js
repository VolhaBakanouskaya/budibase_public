import { writable, get } from "svelte/store"

export const createInterfaceStores = context => {
  const { rows } = context
  const selectedCellId = writable(null)
  const selectedRows = writable({})
  const hoveredRowId = writable(null)

  // Ensure we clear invalid rows from state if they disappear
  rows.subscribe($rows => {
    const $selectedCellId = get(selectedCellId)
    const $selectedRows = get(selectedRows)
    const $hoveredRowId = get(hoveredRowId)

    // Check selected cell
    const selectedRowId = $selectedCellId?.split("-")[0]
    if (selectedRowId && !$rows.find(row => row._id === selectedRowId)) {
      selectedCellId.set(null)
    }

    // Check hovered row
    if ($hoveredRowId && !$rows.find(row => row._id === $hoveredRowId)) {
      hoveredRowId.set(null)
    }

    // Check selected rows
    let newSelectedRows = { ...$selectedRows }
    let selectedRowsNeedsUpdate = false
    const selectedIds = Object.keys($selectedRows)
    for (let i = 0; i < selectedIds.length; i++) {
      if (!$rows.find(row => row._id === selectedIds[i])) {
        delete newSelectedRows[selectedIds[i]]
        selectedRowsNeedsUpdate = true
      }
    }
    if (selectedRowsNeedsUpdate) {
      selectedRows.set(newSelectedRows)
    }
  })

  return { selectedCellId, selectedRows, hoveredRowId }
}