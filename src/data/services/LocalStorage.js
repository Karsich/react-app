const TODO_ITEMS_LOCAL_STORAGE_KEY = 'TODO_ITEMS_LOCAL_STORAGE_KEY';

export const LocalStorage = {
  getTodoItemsFromLocalStorage: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rawData = localStorage.getItem(TODO_ITEMS_LOCAL_STORAGE_KEY);
        const defaultResult = [];
        
        if (!rawData) {
          resolve(defaultResult);
          return;
        }
        const data = JSON.parse(rawData);
    
        if (!Array.isArray(data)) {
          resolve(defaultResult);
          return;
        }
    
        resolve(data);
      }, 500);
    })
  },

  saveTodoItemToLocalStorage: (todoItem) => {
    return new Promise((resolve, reject) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const newTodoItems = [...todoItems, todoItem];
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
        resolve();
      })
    });
  },

    deleteTodoItemFromLocalStorage: (todoItemId) => {
      return new Promise((resolve, reject) => {
        LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
          const updatedTodoItems = todoItems.filter(item => item.id !== todoItemId);
          localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(updatedTodoItems));
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },

    toggleTodoItemInLocalStorage: (todoItemId) => {
      return new Promise((resolve, reject) => {
        LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
          const updatedTodoItems = todoItems.map((item) => {
            if (item.id === todoItemId) {
              return { ...item, isDone: !item.isDone };
            }
            return item;
          });
          localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(updatedTodoItems));
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },

    updateTodoPriorityInLocalStorage: (todoItemId, newPriority) => {
      return new Promise((resolve, reject) => {
        LocalStorage.getTodoItemsFromLocalStorage()
          .then((todoItems) => {
            const updatedTodoItems = todoItems.map((item) => {
              if (item.id === todoItemId) {
                return { ...item, priority: newPriority };
              }
              return item;
            });
            localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(updatedTodoItems));
            resolve();
          })
          .catch(reject);
      });
    }
}