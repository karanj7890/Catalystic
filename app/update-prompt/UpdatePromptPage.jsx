"use client"
import { Suspense } from 'react';
import EditPrompt from './page';
import Loading from '@app/profile/loading';

const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <EditPrompt />
    </Suspense>
  );
};
export default UpdatePromptPage;