"use client";
import { Suspense } from 'react';
import EditPrompt from './page';

const UpdatePromptPage = () => {
  return (
    <Suspense>
      <EditPrompt />
    </Suspense>
  );
};

export default UpdatePromptPage;
