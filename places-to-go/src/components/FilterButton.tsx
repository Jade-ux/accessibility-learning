type FilterButtonProps = {
  name: string;
  isPressed: boolean;
  setFilter: (name: string) => void;
};

function FilterButton(props: FilterButtonProps) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> places</span>
    </button>
  );
}

export default FilterButton;
