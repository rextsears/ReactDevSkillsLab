import React, { useState } from "react";

function SkillEditForm({ skill, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSkill, setEditedSkill] = useState({ ...skill });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleNameChange = (e) => {
    setEditedSkill({ ...editedSkill, name: e.target.value });
  };

  const handleLevelChange = (e) => {
    setEditedSkill({ ...editedSkill, level: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedSkill);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={editedSkill.name}
                onChange={handleNameChange}
              />
            </label>
          </div>
          <div>
            <label>
              Level:
              <select value={editedSkill.level} onChange={handleLevelChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </label>
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          {skill.name} (Level {skill.level}){" "}
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default SkillEditForm;
