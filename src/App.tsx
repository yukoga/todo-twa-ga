import { useState } from 'react';

type Todo = {
  readonly id: number;
  title: string;
  completed: boolean;
  removed: boolean;
};

type Filter = 'all' | 'completed' | 'uncompleted' | 'removed';

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };
  const handleSubmit = () => {
    if (!text) return;
    const newTodo: Todo = {
      title: text,
      id: new Date().getTime(),
      completed: false,
      removed: false
    };
    setTodos((todos) => [newTodo, ...todos]);
    setText('');
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  /*
  const handleTextEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: value };
        }
        return todo;
      });

      // check if todo is immutable.
      // console.log('========= check =========');
      // todos.map((todo) => {
      //   console.log(`id: ${todo.id}, title: ${todo.title}`);
      // });
      return newTodos;
    });
  };
  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: checked };
        }
        return todo;
      });

      return newTodos;
    });
  };
  
  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, removed: removed };
        }
        return todo;
      });

      return newTodos;
    });
  };
  */
  const handleClearTrash = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'completed':
        return todo.completed && !todo.removed;
      case 'uncompleted':
        return !todo.completed && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });
  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        } else {
          return todo;
        }
      });

      return newTodos;
    });
  };
  return (
    <div>
      <select
        title="select-filter"
        defaultValue="all"
        onChange={(e) => {
          handleFilter(e.target.value as Filter);
        }}
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="uncompleted">WIP Tasks</option>
        <option value="removed">Trashed</option>
      </select>
      {filter === 'removed' ? (
        <button
          aria-label="trash-clear-btn"
          type="button"
          disabled={todos.filter((todo) => todo.removed).length === 0}
          onClick={handleClearTrash}
        >
          Clear trashcan
        </button>
      ) : (
        filter !== 'completed' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              aria-label="form-text"
              type="text"
              value={text}
              onChange={handleTextChange}
            />
            <input type="submit" value="Add task" onSubmit={handleSubmit} />
          </form>
        )
      )}
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                aria-label="todo-completed-checkbox"
                type="checkbox"
                disabled={todo.removed}
                checked={todo.completed}
                onChange={() =>
                  handleTodo(todo.id, 'completed', !todo.completed)
                }
              />
              <input
                aria-label="todo-input-text"
                type="text"
                disabled={todo.completed}
                value={todo.title}
                onChange={(e) => handleTodo(todo.id, 'title', e.target.value)}
              />
              <button
                onClick={() => handleTodo(todo.id, 'removed', !todo.removed)}
              >
                {todo.removed ? 'Recover removed task' : 'Remove task'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
