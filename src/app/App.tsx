import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './ThemeProvider';
import { SavedProvider } from './hooks/useSavedRecipes';

export default function App() {
  return (
    <ThemeProvider>
      <SavedProvider>
        <RouterProvider router={router} />
      </SavedProvider>
    </ThemeProvider>
  );
}
