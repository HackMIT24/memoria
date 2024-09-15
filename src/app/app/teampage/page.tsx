import React from 'react';

const TeamPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6">Meet the Team</h1>
      
      <div className="mb-4">
        <h2 className="text-2xl">Eva Cullen</h2>
        <p>
          Hi! My name is Eva Cullen, and I'm a student at Columbia University studying Physics and Mathematical Probability. 
          I am one of the main developers of the memory game, which is our app's core. By implementing my knowledge in TypeScript 
          and researching, I was able to develop the game. Our mission to slow down the symptoms of Alzheimer's through games is a 
          promising idea we are deeply dedicated to.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl">Asya</h2>
        <p>
          Hello, everyone! My name is Asya, and I’m currently a junior studying Computer Science at Columbia University. 
          I’m also the founder of Memoria, an app born from my personal experience of losing a loved one to Alzheimer’s. 
          I’m deeply committed to making the journey through this disease less daunting by creating a game-based and personalized 
          approach that brings comfort and support to both patients and their families.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl">Arnab Ghosh</h2>
        <p>
          Hello! I'm Arnab Ghosh, a CS/Math student at Cornell University. I worked on the full-stack development of the website, 
          ensuring a balance between the design and functionality. I am very dedicated to making a change in this under-researched 
          field. From the designs to games, we are proud of our work.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl">Zeynep Ozdemir</h2>
        <p>
          Hello all! I’m Zeynep Ozdemir, a Computer Science student at Georgia State University with a focus on Data Science. 
          After learning about the limited research in dementia and Alzheimer’s care, I believe AI can greatly improve patient outcomes. 
          I aim to create an app that uses AI to help caregivers track health and enhance memory care. With skills in Python, Java, and SQL, 
          I’m passionate about leveraging technology to make a difference in healthcare.
        </p>
      </div>
    </div>
  );
};

export default TeamPage;