import { nanoid } from "nanoid";

import { useState } from "react";
import FilterButton from "../FilterButton";
import NAPlacesToGo from "./NAPlacesToGo";
import NAForm from "./NAForm";

const FILTER_MAP = {
  all: () => true,
  wishlist: (place: Place) => !place.completed,
  visited: (place: Place) => place.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export interface Place {
  id: string;
  name: string;
  completed: boolean;
}

interface NotAccessibleProps {
  places: Place[];
}

export function NotAccessible(props: NotAccessibleProps) {
  const [places, setPlaces] = useState(props.places);
  const [filter, setFilter] = useState("all");

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
    ?.filter(FILTER_MAP[filter as keyof typeof FILTER_MAP])
    .map((place) => (
      <NAPlacesToGo
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

  const headingNoun = `${placeList?.length === 1 ? "place" : "places"}`;
  const headingText = `${placeList.length} ${headingNoun}`;

  return (
    <div className="placeapp">
      <h2>Accessible</h2>
      <p>Add steps to walk through, to show accessibility</p>
      <NAForm addPlace={addPlace} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex={-1}>
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

export default NotAccessible;
