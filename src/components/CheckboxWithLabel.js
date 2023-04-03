import { Form } from 'react-bootstrap';

function CheckboxWithLabel({ label, checked, onChange }) {
  return (
    <Form.Check
      type="checkbox"
      label={label}
      checked={checked}
      onChange={onChange}
    />
  );
}

export default CheckboxWithLabel;