import React from "react";
import { nanoid } from "nanoid";

import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import FilterButton from "./FilterButton";

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// change completed to visited
const FILTER_MAP = {
  All: () => true,
  Active: (place) => !place.completed,
  Completed: (place) => place.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

interface AccessibleProps {
  places: {
    id: string;
    name: string;
    completed: boolean;
  }[];
}

export function Accessible(props: AccessibleProps) {
  const [places, setPlaces] = useState(props.places);
  const [filter, setFilter] = useState("All");

  function editPlace(id: string, newName: string) {
    const editedPlaceList = places.map((place) => {
      if (id === place.id) {
        return { ...place, name: newName };
      }
      return place;
    });
    setPlaces(editedPlaceList);
  }

  function deletePlace(id: string) {
    const remainingPlaces = places.filter((place) => id !== place.id);
    setPlaces(remainingPlaces);
  }

  const placeList = places
    ?.filter(FILTER_MAP[filter])
    .map((place) => (
      <PlacesToGo
        id={place.id}
        name={place.name}
        completed={place.completed}
        key={place.id}
        togglePlaceCompleted={togglePlaceCompleted}
        deletePlace={deletePlace}
        editPlace={editPlace}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addPlace(name: string) {
    const newPlace = {
      id: "place-" + nanoid(),
      name: name,
      completed: false,
    };
    setPlaces([...places, newPlace]);
  }

  return (
    <div>
      <h2>Accessible</h2>
      <p>
        This component is accessible. It is a simple component that renders a
        heading and a paragraph.
      </p>
      <Form addPlace={addPlace} />
      <div className="filters btn-group stack-exception">{filterList}</div>
    </div>
  );
}

export default Accessible;
