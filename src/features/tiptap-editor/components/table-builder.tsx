import React, { useState, useCallback } from "react";

import { PopoverClose } from "@radix-ui/react-popover";

import { cn } from "../helpers/utils";

const COLUMNS = 10;
const ROWS = 10;

type GridSize = { cols: number; rows: number };

interface TableBuilderProps {
  onCreate?: (value: GridSize) => void;
}

const TableBuilder = ({ onCreate }: TableBuilderProps) => {
  const [gridSize, setGridSize] = useState<GridSize>({ cols: 1, rows: 1 });

  const handleSelect = useCallback(
    (rows: number, cols: number) => {
      onCreate?.({ rows, cols });
    },
    [onCreate]
  );

  return (
    <div className="rte-table-builder">
      <div className="rte-table-builder__grid">
        {Array.from({ length: ROWS }, (_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="rte-table-builder__row">
            {Array.from({ length: COLUMNS }, (_, colIndex) => (
              <PopoverClose key={`col-${colIndex}`} asChild>
                <div
                  className={cn(
                    "rte-table-builder__cell",
                    rowIndex < gridSize.rows &&
                      colIndex < gridSize.cols &&
                      "rte-table-builder__cell--active"
                  )}
                  onMouseEnter={() =>
                    setGridSize({ cols: colIndex + 1, rows: rowIndex + 1 })
                  }
                  onClick={() => handleSelect(rowIndex + 1, colIndex + 1)}
                />
              </PopoverClose>
            ))}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginBlock: 3 }}>
        {gridSize.rows} x {gridSize.cols}
      </div>
    </div>
  );
};

export default TableBuilder;
