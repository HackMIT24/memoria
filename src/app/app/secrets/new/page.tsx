import React from 'react';
import SecretDrawerForm from 'app/secrets';

const SecretDrawerPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Secret Drawer</h1>
      <SecretDrawerForm />
    </div>
  );
};

export default SecretDrawerPage;