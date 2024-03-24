import { SetStateAction, useEffect, useRef, useState } from "react";
import { FormEvent } from "./Form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function usePrevious(value: any) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface PlacesToGoProps {
  id: string;
  name: string;
  completed: boolean;
  editPlace: (id: string, newName: string) => void;
  deletePlace: (id: string) => void;
  togglePlaceCompleted: (id: string) => void;
}

function PlacesToGo(props: PlacesToGoProps) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  // useRef() creates an object with a single property current. This object persists for the full lifetime of the component.

  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  // eg. useRef(null) is equivalent to creating an object { current: null }. - it can store any value, even elements - which is what we'll do
  console.log("editFieldRef: ", editFieldRef);
  console.log("editButtonRef: ", editButtonRef);

  const wasEditing = usePrevious(isEditing);

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
          ref={editFieldRef}
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
          ref={editButtonRef}
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

  useEffect(() => {
    if (!wasEditing && isEditing) {
      if (editFieldRef.current !== null) {
        console.log("editFieldRef.current: ", editFieldRef.current);
        editFieldRef.current.focus();
      }
    } else if (wasEditing && !isEditing) {
      if (editButtonRef.current !== null) {
        console.log("editButtonRef.current: ", editButtonRef.current);
        editButtonRef.current.focus();
      }
    }
  }, [wasEditing, isEditing]);

  return (
    <li className="place">{isEditing ? editingTemplate : viewTemplate}</li>
  );
}

export default PlacesToGo;
