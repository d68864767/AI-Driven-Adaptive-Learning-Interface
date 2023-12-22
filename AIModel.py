```python
# Import necessary libraries
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np

class AIModel:
    def __init__(self):
        # Initialize the model
        self.model = self.create_model()

    def create_model(self):
        # Define the model architecture
        model = keras.Sequential([
            layers.Dense(64, activation='relu', input_shape=[len(train_dataset.keys())]),
            layers.Dense(64, activation='relu'),
            layers.Dense(1)
        ])

        # Compile the model
        model.compile(loss='mean_squared_error',
                      optimizer=tf.keras.optimizers.RMSprop(0.001),
                      metrics=['mean_absolute_error', 'mean_squared_error'])
        return model

    def train_model(self, train_dataset, train_labels, epochs):
        # Train the model
        history = self.model.fit(
            train_dataset, train_labels,
            epochs=epochs, validation_split = 0.2, verbose=0)
        return history

    def evaluate_model(self, test_dataset, test_labels):
        # Evaluate the model
        loss, mae, mse = self.model.evaluate(test_dataset, test_labels, verbose=2)
        return loss, mae, mse

    def predict(self, input_data):
        # Make predictions
        predictions = self.model.predict(input_data).flatten()
        return predictions

    def save_model(self, model_name):
        # Save the model
        self.model.save(model_name)

    def load_model(self, model_name):
        # Load a saved model
        self.model = keras.models.load_model(model_name)
```
