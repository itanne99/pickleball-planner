import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ value, onChange, placeholder = 'Search...', onClear }) {
  const [localValue, setLocalValue] = useState(value || '');

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    onChange?.(val);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange?.('');
    onClear?.();
  };

  return (
    <InputGroup className="search-bar">
      <InputGroup.Text className="border-end-0">
        <FiSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        className="border-start-0"
        aria-label={placeholder}
      />
      {localValue && (
        <InputGroup.Text
          className="border-start-0 cursor-pointer"
          onClick={handleClear}
          role="button"
          aria-label="Clear search"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClear()}
        >
          <FiX />
        </InputGroup.Text>
      )}
    </InputGroup>
  );
}
