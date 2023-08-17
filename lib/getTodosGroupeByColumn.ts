import { databases } from "@/appwrite"

export const getTodosGroupeByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABSES_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    );
    const todos = data.documents;
// @ts-ignore
    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            }
            )
        }
        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            //get the image if exist on the todo
            ...(todo.image && { image: JSON.parse(todo.image) })
        });
        return acc;

    }, new Map<TypedColumn, Column>)

    //if columns doesnt have in progress, todo and done, add them with empty todos 

    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: [],
            });
        }
    }
    

    // sort columns by columnsTypes
    const sortedColumns = new Map(
        // @ts-ignore
        Array.from(columns.entries()).sort((a, b) =>
        // @ts-ignore
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        )
    );
    const board: Board={
        // @ts-ignore
        columns:sortedColumns
    } 
    return board;
};
