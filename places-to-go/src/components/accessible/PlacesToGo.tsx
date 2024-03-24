import { SetStateAction, useEffect, useRef, useState } from "react";
import { FormEvent } from "./Form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function usePrevious(value: any) {
  // custom hook created to store the previous value of a state variable
  // because we want to know when the value of isEditing changes from false to true, and vice versa
  // ref: https://legacy.reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
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

  // we want to know when the user is editing a place, so we can focus the input field
  // and then we want to know when they are done editing, so we can focus the Edit button again
  // to store not only the current value but also the previous value, we need to do something like this:
  // ref: https://react.dev/reference/react/useState#storing-information-from-previous-renders

  // const [wasEditing, setWasEditing] = useState(false);

  // if (wasEditing && isEditing) {
  //   setWasEditing(false);
  // } else if (wasEditing && !isEditing) {
  //   setWasEditing(true);
  // }

  const wasEditing = usePrevious(isEditing);

  // useRef() creates an object with a single property current. This object persists for the full lifetime of the component.
  // starts with null - will be empty until they're attached to a DOM element
  // and only after React has rendered the component

  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  // eg. useRef(null) is equivalent to creating an object { current: null }. - it can store any value, even elements - which is what we'll do
  console.log("editFieldRef: ", editFieldRef);
  console.log("editButtonRef: ", editButtonRef);

  function handleChange(event: { target: { value: SetStateAction<string> } }) {
    setNewName(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    props.editPlace(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  // because this will run as soon as the component is rendered, and isEditing will be false, we don't want to focus the input field if the user hasn't clicked the Edit button yet
  // so we need to check if the user has clicked the Edit button before we focus the input field
  // this is where the wasEditing variable comes in - it will store the previous value of isEditing - using the usePrevious custom hook
  useEffect(() => {
    // we want to focus the input field when the user clicks the Edit button, and we switch to the edit template
    if (!wasEditing && isEditing) {
      if (editFieldRef.current !== null) {
        editFieldRef.current.focus();
      }
      // we want to focus the Edit button when the user clicks the Save button, and we switch to the view template
    } else if (wasEditing && !isEditing) {
      if (editButtonRef.current !== null) {
        editButtonRef.current.focus();
      }
    }
  }, [wasEditing, isEditing]);

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
          // attach the ref to the input element
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
          // attach the ref to the button element
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

  return (
    <li className="place">{isEditing ? editingTemplate : viewTemplate}</li>
  );
}

export default PlacesToGo;
