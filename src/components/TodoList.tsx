
import React, { useState } from 'react';
import { Check, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  deadline: string;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Location besichtigen', completed: true, category: 'Location', deadline: '15. Jan 2025' },
    { id: 2, text: 'Fotografen buchen', completed: false, category: 'Dienstleister', deadline: '31. März 2025' },
    { id: 3, text: 'Save-the-Date Karten versenden', completed: false, category: 'Papeterie', deadline: '15. April 2025' },
    { id: 4, text: 'Hochzeitskleid anprobieren', completed: false, category: 'Outfit', deadline: '30. April 2025' },
    { id: 5, text: 'DJ buchen', completed: false, category: 'Dienstleister', deadline: '15. Mai 2025' },
    { id: 6, text: 'Menü festlegen', completed: false, category: 'Catering', deadline: '30. Mai 2025' },
    { id: 7, text: 'Einladungen versenden', completed: false, category: 'Papeterie', deadline: '15. Juni 2025' },
    { id: 8, text: 'Trauringe aussuchen', completed: false, category: 'Ringe', deadline: '30. Juni 2025' },
  ]);
  
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState('');
  const [newTodoDeadline, setNewTodoDeadline] = useState('');
  
  const categories = [...new Set(todos.map(todo => todo.category))];
  
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const filteredTodos = todos
    .filter(todo => !filterCategory || todo.category === filterCategory)
    .filter(todo => showCompleted || !todo.completed);
  
  const addNewTodo = () => {
    if (newTodoText.trim() && newTodoCategory.trim() && newTodoDeadline.trim()) {
      const newTodo: Todo = {
        id: Math.max(0, ...todos.map(t => t.id)) + 1,
        text: newTodoText,
        category: newTodoCategory,
        deadline: newTodoDeadline,
        completed: false
      };
      
      setTodos([...todos, newTodo]);
      setNewTodoText('');
      setNewTodoCategory('');
      setNewTodoDeadline('');
      setIsAddingNew(false);
    }
  };
  
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">To-Do Liste</h2>
        <div className="flex gap-2">
          <button 
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              showCompleted ? 'bg-telegram-blue text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? 'Alle anzeigen' : 'Nur offene'}
          </button>
          <button 
            className="bg-telegram-blue text-white px-3 py-1.5 rounded-md text-xs flex items-center gap-1"
            onClick={() => setIsAddingNew(true)}
          >
            <Plus className="w-3 h-3" />
            Neu
          </button>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            !filterCategory ? 'bg-telegram-blue text-white' : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setFilterCategory(null)}
        >
          Alle
        </button>
        
        {categories.map(category => (
          <button 
            key={category}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filterCategory === category ? 'bg-telegram-blue text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setFilterCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600">Fortschritt</span>
          <span className="text-sm font-medium">
            {todos.filter(t => t.completed).length}/{todos.length}
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${(todos.filter(t => t.completed).length / todos.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
      
      {/* Todo list */}
      <div className="space-y-1">
        <AnimatePresence>
          {filteredTodos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border border-gray-100 rounded-lg overflow-hidden"
            >
              <div className={`flex items-center p-3 ${todo.completed ? 'bg-gray-50' : 'bg-white'}`}>
                <button 
                  className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    todo.completed 
                      ? 'border-green-500 bg-green-500 text-white' 
                      : 'border-telegram-blue'
                  }`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed && <Check className="w-3 h-3" />}
                </button>
                
                <div className="ml-3 flex-1">
                  <p className={`text-sm ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.text}</p>
                  <div className="flex items-center mt-1">
                    <span className={`todo-category bg-gray-100 text-gray-600`}>
                      {todo.category}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">Bis {todo.deadline}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredTodos.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Keine To-Dos gefunden</p>
          </div>
        )}
      </div>
      
      {/* Add new todo modal */}
      {isAddingNew && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Neue Aufgabe</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aufgabe
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="z.B. Blumen bestellen"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategorie
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="z.B. Dekoration"
                  value={newTodoCategory}
                  onChange={(e) => setNewTodoCategory(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="z.B. 15. Mai 2025"
                  value={newTodoDeadline}
                  onChange={(e) => setNewTodoDeadline(e.target.value)}
                />
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end gap-2">
              <button 
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsAddingNew(false)}
              >
                Abbrechen
              </button>
              <button 
                className="px-4 py-2 text-sm bg-telegram-blue text-white rounded-md hover:bg-telegram-blue/90 transition-colors"
                onClick={addNewTodo}
              >
                Hinzufügen
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
