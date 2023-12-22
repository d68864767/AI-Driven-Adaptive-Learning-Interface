import { MongoClient } from 'mongodb';

class DatabaseManager {
  constructor() {
    this.client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(process.env.DB_NAME);
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  }

  async loadUserData() {
    try {
      if (!this.db) await this.connect();
      const collection = this.db.collection('users');
      const userData = await collection.findOne({});
      return userData;
    } catch (error) {
      console.error('Error loading user data:', error);
      throw error;
    }
  }

  async updateUserData(interactionData) {
    try {
      if (!this.db) await this.connect();
      const collection = this.db.collection('users');
      const updateResult = await collection.updateOne(
        { _id: interactionData.user._id },
        { $set: { lastInteraction: interactionData } }
      );
      if (updateResult.modifiedCount === 0) {
        console.warn('No user data was updated. Check the provided interaction data.');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }
}

export default new DatabaseManager();
