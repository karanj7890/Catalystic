import { Suspense } from 'react';
import EditPrompt from './page';

const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
};

export default UpdatePromptPage;