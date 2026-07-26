import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const columns = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Won",
  "Lost",
];

export default function KanbanBoard() {
  return (
    <div className="grid grid-cols-6 gap-5">

      {columns.map((column) => (
        <div
          key={column}
          className="bg-slate-100 rounded-xl p-4 min-h-[500px]"
        >
          <h2 className="font-bold text-lg mb-4">
            {column}
          </h2>
        </div>
      ))}

    </div>
  );
}