import React from "react";
import { nanoid } from "nanoid";

import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import FilterButton from "./FilterButton";
import PlacesToGo from "./PlacesToGo";

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
  Active: (place: Place) => !place.completed,
  Completed: (place: Place) => place.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export interface Place {
  id: string;
  name: string;
  completed: boolean;
}

interface AccessibleProps {
  places: Place[];
}

export function Accessible(props: AccessibleProps) {
  const [places, setPlaces] = useState(props.places);
  const [filter, setFilter] = useState("All");

  function togglePlaceCompleted(id: string) {
    const updatedPlaces = places.map((place) => {
      if (id === place.id) {
        return { ...place, completed: !place.completed };
      }
      return place;
    });
    setPlaces(updatedPlaces);
  }

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

  const headingNoun = `${placeList?.length > 1 ? "places" : "place"} to visit`;
  const headingText = `${placeList.length} ${headingNoun} remaining`;

  const listHeadingRef = useRef<HTMLHeadingElement>(null);
  const prevPlaceLength = usePrevious(placeList?.length);

  useEffect(() => {
    if (prevPlaceLength && placeList?.length < prevPlaceLength) {
      listHeadingRef.current?.focus();
    }
  }, [placeList?.length, prevPlaceLength]);

  return (
    <div>
      <h2>Accessible</h2>
      <p>Add steps to walk through, to show accessibility</p>
      <Form addPlace={addPlace} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1">
        {headingText}
      </h2>
      <ul
        aria-labelledby="list-heading"
        className="places-list stack-large stack-exception"
        role="list"
      >
        {placeList}
      </ul>
    </div>
  );
}

export default Accessible;
