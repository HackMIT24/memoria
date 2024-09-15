import React from 'react';

const MotivationPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Memoria: Our Motivation & Vision</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl mb-2">Our Motivation</h2>
        <p>
          Memoria was built with the goal of making the journey through Alzheimer’s and Dementia less daunting and more comfortable for both patients and their caregivers. Inspired by personal experiences, we aimed to create a tool that could ease the fear and uncertainty surrounding the disease. Our app focuses on scientifically-backed methods that help slow down cognitive decline through engaging games, personalized features, and practical support.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl mb-2">Impact & Vision</h2>
        <p>
          We believe that while there is no cure for Alzheimer’s, its progression can be slowed down through proper mental stimulation and support. Memoria offers a personalized and interactive platform for patients to keep their minds active and engaged. Our vision is to create a world where Alzheimer’s patients can maintain a better quality of life, and caregivers can find relief in knowing that their loved ones are receiving meaningful cognitive care.
        </p>
      </section>
    </div>
  );
};

export default MotivationPage;