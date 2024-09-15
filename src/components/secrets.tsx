import React, { useState } from 'react';

interface UserAnswers {
  fullName: string;
  age: string;
  memoryIssuesDuration: string;
  diagnosis: string;
  livingSituation: string;
  caregiver: string;
  emergencyContacts: string;
  dailyRoutine: string;
  dietaryRestrictions: string;
  importantDatesReminder: string;
  alertOnWandering: string;
  calmingMethods: string;
}

const SecretDrawerForm: React.FC = () => {
  const [answers, setAnswers] = useState<UserAnswers>({
    fullName: '',
    age: '',
    memoryIssuesDuration: '',
    diagnosis: '',
    livingSituation: '',
    caregiver: '',
    emergencyContacts: '',
    dailyRoutine: '',
    dietaryRestrictions: '',
    importantDatesReminder: 'No',
    alertOnWandering: 'No',
    calmingMethods: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAnswers(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(answers); // Replace with your save function
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>1. What is your full name and preferred nickname?</label>
        <input name="fullName" value={answers.fullName} onChange={handleChange} className="block w-full mb-2" />
      </div>
      <div>
        <label>2. How old are you and how long have you been experiencing memory issues?</label>
        <input name="age" value={answers.age} onChange={handleChange} className="block w-full mb-2" />
      </div>
      <div>
        <label>3. Have you been diagnosed with Alzheimer's or dementia? If yes, when?</label>
        <input name="diagnosis" value={answers.diagnosis} onChange={handleChange} className="block w-full mb-2" />
      </div>
      <div>
        <label>4. Do you live alone or with family, and who is your primary caregiver?</label>
        <input name="livingSituation" value={answers.livingSituation} onChange={handleChange} className="block w-full mb-2" />
      </div>
      <div>
        <label>5. Can you provide the names and contact information of close relatives for emergencies?</label>
        <textarea name="emergencyContacts" value={answers.emergencyContacts} onChange={handleChange} className="block w-full mb-2" />
      </div>
      <div>
        <label>6. What is your daily routine and favorite activities or hobbies?</label>
        <textarea name="dailyRoutine" value={answers.dailyRoutine} onChange={handleChange} className="block w-full mb-2" />
      </div>
      <div>
        <label>7. Do you have any dietary restrictions or medication?</label>
        <input name="dietaryRestrictions" value={answers.dietaryRestrictions} onChange={handleChange} className="block w-full mb-2" />
      </div>
      <div>
        <label>8. Would you like the assistant to remind you of important dates?</label>
        <select name="importantDatesReminder" value={answers.importantDatesReminder} onChange={handleChange} className="block w-full mb-2">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>9. Should the assistant alert someone if you wander or seem lost?</label>
        <select name="alertOnWandering" value={answers.alertOnWandering} onChange={handleChange} className="block w-full mb-2">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>10. How can the assistant best help you stay calm if you feel confused?</label>
        <textarea name="calmingMethods" value={answers.calmingMethods} onChange={handleChange} className="block w-full mb-2" />
      </div>
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Save</button>
    </form>
  );
};

export default SecretDrawerForm;