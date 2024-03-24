import { SetStateAction, useState } from "react";
import { FormEvent } from "./NAForm";

interface NAPlacesToGoProps {
  id: string;
  name: string;
  completed: boolean;
  editPlace: (id: string, newName: string) => void;
  deletePlace: (id: string) => void;
  togglePlaceCompleted: (id: string) => void;
}

function NAPlacesToGo(props: NAPlacesToGoProps) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(event: { target: { value: SetStateAction<string> } }) {
    setNewName(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    props.editPlace(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="places-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="input-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn place-btn place-cancel-btn"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden"> renaming {props.name}</span>
        </button>
        <button type="submit" className="btn place-btn place-edit-btn">
          Save
          <span className="visually-hidden"> new name for {props.name} </span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.togglePlaceCompleted(props.id)}
        />
        <label className="place-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn place-btn place-edit-btn"
          onClick={() => {
            setEditing(true);
          }}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn place-btn place-delete-btn"
          onClick={() => props.deletePlace(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return (
    <li className="place">{isEditing ? editingTemplate : viewTemplate}</li>
  );
}

export default NAPlacesToGo;
