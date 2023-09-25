import React, { useState } from "react";
import "./styles.css";
import SkillEditForm from "./SkillEditForm";

const initialSkills = [
  { id: 1, name: "HTML", level: 5 },
  { id: 2, name: "CSS", level: 3 },
  { id: 3, name: "JavaScript", level: 4 },
  { id: 4, name: "Python", level: 2 }
];

function SkillList({ skills, onDelete, onEdit }) {
  return (
    <ul>
      {skills.map((skill) => (
        <SkillListItem
          key={skill.id}
          skill={skill}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

function SkillListItem({ skill, onDelete, onEdit }) {
  const handleDelete = () => {
    onDelete(skill.id);
  };

  return (
    <li>
      <SkillEditForm skill={skill} onEdit={onEdit} />
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

function NewSkillForm({ setSkills, skills }) {
  const [formData, setFormData] = useState({ name: "", level: 1 });

  const handleSkillChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleLevelChange = (e) => {
    setFormData({ ...formData, level: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkills([...skills, { ...formData, id: Date.now() }]);
    setFormData({ name: "", level: 1 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="form-group">
          <label>
            Skill:
            <input
              type="text"
              value={formData.name}
              onChange={handleSkillChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Level:
            <select value={formData.level} onChange={handleLevelChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <button type="submit">ADD SKILL</button>
        </div>
      </div>
    </form>
  );
}

export default function App() {
  const [skills, setSkills] = useState(initialSkills);

  const handleDeleteSkill = (id) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id);
    setSkills(updatedSkills);
  };

  const handleEditSkill = (editedSkill) => {
    const updatedSkills = skills.map((s) =>
      s.id === editedSkill.id ? editedSkill : s
    );
    setSkills(updatedSkills);
  };

  return (
    <div className="App">
      <h1>React Dev Skills</h1>
      <SkillList
        skills={skills}
        onDelete={handleDeleteSkill}
        onEdit={handleEditSkill}
      />
      <hr />
      <NewSkillForm setSkills={setSkills} skills={skills} />
    </div>
  );
}
