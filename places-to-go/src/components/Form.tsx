// Places to visit
// filters: visited, not visited, all

import React from "react";
import { useState } from "react";

type FormProps = {
  addPlace: (name: string) => void;
};

function Form(props: FormProps) {
  const { addPlace } = props;
  const [name, setName] = useState<string>("");

  // fix for being able to submit blank form
  function handleSubmit(event) {
    event.preventDefault();
    addPlace(name);
    setName("");
  }

  function handleChange(event) {
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
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
