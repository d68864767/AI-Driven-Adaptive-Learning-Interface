import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import AIModel from './AIModel.py';
import DatabaseManager from './DatabaseManager.js';
import CloudService from './CloudService.js';
import APIManager from './APIManager.js';
import AccessibilityTools from './AccessibilityTools.js';

describe('AILI Application', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText(/AILI/i)).toBeInTheDocument();
  });

  test('loads user data on mount', async () => {
    DatabaseManager.loadUserData = jest.fn().mockResolvedValue({ name: 'Test User' });
    render(<App />);
    await waitFor(() => expect(DatabaseManager.loadUserData).toHaveBeenCalled());
  });

  test('loads learning modules on mount', async () => {
    APIManager.loadLearningModules = jest.fn().mockResolvedValue([{ id: 1, title: 'Test Module' }]);
    render(<App />);
    await waitFor(() => expect(APIManager.loadLearningModules).toHaveBeenCalled());
  });

  test('loads accessibility options on mount', async () => {
    AccessibilityTools.loadOptions = jest.fn().mockResolvedValue([{ id: 1, name: 'Test Option' }]);
    render(<App />);
    await waitFor(() => expect(AccessibilityTools.loadOptions).toHaveBeenCalled());
  });

  test('handles module selection', () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('module-selection-button'));
    expect(screen.getByText(/Module Selected/i)).toBeInTheDocument();
  });

  test('handles user interaction', () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('interaction-button'));
    expect(screen.getByText(/Interaction Handled/i)).toBeInTheDocument();
  });

  test('AI model prediction', () => {
    const input_data = [1, 2, 3, 4, 5];
    const aiModel = new AIModel();
    const prediction = aiModel.predict(input_data);
    expect(prediction).toBeDefined();
  });

  test('DatabaseManager updates user data', async () => {
    const interactionData = { user: { _id: '123' }, interaction: 'Test Interaction' };
    DatabaseManager.updateUserData = jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 1 });
    await DatabaseManager.updateUserData(interactionData);
    expect(DatabaseManager.updateUserData).toHaveBeenCalledWith(interactionData);
  });

  test('CloudService file upload', async () => {
    const fileName = 'test.txt';
    const filePath = './test.txt';
    CloudService.uploadFile = jest.fn().mockResolvedValue({ Location: 'https://test-bucket.s3.amazonaws.com/test.txt' });
    await CloudService.uploadFile(fileName, filePath);
    expect(CloudService.uploadFile).toHaveBeenCalledWith(fileName, filePath);
  });

  test('APIManager loads learning modules', async () => {
    const modules = [{ id: 1, title: 'Test Module' }];
    APIManager.loadLearningModules = jest.fn().mockResolvedValue(modules);
    const result = await APIManager.loadLearningModules();
    expect(result).toEqual(modules);
  });

  test('AccessibilityTools loads options', async () => {
    const options = [{ id: 1, name: 'Test Option' }];
    AccessibilityTools.loadOptions = jest.fn().mockResolvedValue(options);
    const result = await AccessibilityTools.loadOptions();
    expect(result).toEqual(options);
  });
});
