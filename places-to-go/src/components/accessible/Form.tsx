import React from "react";
import { useState } from "react";

export type FormEvent = React.FormEvent<HTMLFormElement>;

type FormProps = {
  addPlace: (name: string) => void;
};

function Form(props: FormProps) {
  const { addPlace } = props;
  const [name, setName] = useState<string>("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  });

  // fix for being able to submit blank form
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    addPlace(name);
    setName("");
  }

  function handleChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-place-input" className="label__lg">
          Where do you want to go?
        </label>
      </h2>

      <input
        type="text"
        id="new-place-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        ref={inputRef}
      />
      <button type="submit" className="btn place-add-btn">
        Add
      </button>
    </form>
  );
}

export default Form;
