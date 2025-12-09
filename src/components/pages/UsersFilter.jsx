import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const UsersFilter = ({ title, options, selected, onSelectionChange }) => {
  const [opened, setOpened] = useState(false);

  const toggleOption = (value) => {
    onSelectionChange(value);
  };

  return (
    <div className="users__filter users__filter--big">
      <div
        className="users__filter-header"
        onClick={() => setOpened(!opened)}
      >
        <span className="users__filter-title">
          {title} {selected.length == 0 ? null : `(${selected.length})`}
        </span>

        <ChevronDown
          size={18}
          className={opened ? "rotate-180" : ""}
        />
      </div>

      {opened && (
        <div className="users__filter-body">
          {options.map((option) => (
            <label
              key={option}
              className="users__filter-option"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="users__filter-input-hidden"
              />
              <div className="users__custom-checkbox">
                {selected.includes(option) && (
                  <Check size={18} className="users__checkbox-icon" />
                )}
              </div>
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};