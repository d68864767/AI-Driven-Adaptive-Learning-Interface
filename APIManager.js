import axios from 'axios';

class APIManager {
  constructor() {
    this.baseURL = process.env.API_BASE_URL;
  }

  async loadLearningModules() {
    try {
      const response = await axios.get(`${this.baseURL}/learningModules`);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error loading learning modules:', response.status, response.statusText);
        throw new Error('Error loading learning modules');
      }
    } catch (error) {
      console.error('Error loading learning modules:', error);
      throw error;
    }
  }

  async getModuleContent(moduleId) {
    try {
      const response = await axios.get(`${this.baseURL}/learningModules/${moduleId}`);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error getting module content:', response.status, response.statusText);
        throw new Error('Error getting module content');
      }
    } catch (error) {
      console.error('Error getting module content:', error);
      throw error;
    }
  }

  async submitUserInteraction(interactionData) {
    try {
      const response = await axios.post(`${this.baseURL}/userInteractions`, interactionData);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error submitting user interaction:', response.status, response.statusText);
        throw new Error('Error submitting user interaction');
      }
    } catch (error) {
      console.error('Error submitting user interaction:', error);
      throw error;
    }
  }
}

export default new APIManager();
