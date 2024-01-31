import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

export const getTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`); // Assuming the API is running on http://localhost:5000
      return response.data.todos;
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };