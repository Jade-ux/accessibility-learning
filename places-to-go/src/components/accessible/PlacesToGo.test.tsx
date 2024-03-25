// write a test for the focus behaviour of input and button elements in the PlacesToGo component
import { render, screen, fireEvent } from "@testing-library/react";
import PlacesToGo from "./PlacesToGo";

describe("PlacesToGo", () => {
  it("should focus the input field when the user is editing a place", () => {
    // Arrange
    const place = {
      id: "1",
      name: "Test Place",
      completed: false,
    };
    const editPlace = jest.fn();
    const deletePlace = jest.fn();
    const togglePlaceCompleted = jest.fn();

    render(
      <PlacesToGo
        id={place.id}
        name={place.name}
        completed={place.completed}
        editPlace={editPlace}
        deletePlace={deletePlace}
        togglePlaceCompleted={togglePlaceCompleted}
      />
    );

    // Act
    fireEvent.click(screen.getByText("Edit"));

    // Assert
    expect(screen.getByLabelText("Place Name")).toHaveFocus();
  });
});
