import Form from "react-bootstrap/Form";

// Props for the controlled FilterSwitch component
type FilterSwitchProps = {
  id: string; // unique id for the switch input
  label: string; // visible label next to the switch
  checked: boolean; // controlled checked state
  onChange: (checked: boolean) => void; // callback with new checked value
};

// Small wrapper around `react-bootstrap`'s Form.Check configured as a
// switch. This component is controlled: the parent passes `checked` and
// receives changes via `onChange(checked)`. It converts the native event
// to a simple boolean before invoking the callback.
function FilterSwitch({ id, label, checked, onChange }: FilterSwitchProps) {
  return (
    <Form.Check
      type="switch"
      id={id}
      label={label}
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}

export default FilterSwitch;