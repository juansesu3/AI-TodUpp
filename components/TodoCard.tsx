"use client";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/20/solid";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggleProps: DraggableProvidedDraggableProps;
  draggleHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggleProps,
  draggleHandleProps,
}: Props) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  return (
    <div
      className="bg-white rounded-md space-y-2 mt-2 drop-shadow-md"
      {...draggleProps}
      {...draggleHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {/*Add image here...  */}
    </div>
  );
};

export default TodoCard;
