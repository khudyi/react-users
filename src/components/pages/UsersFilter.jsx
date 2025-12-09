import { useState, useMemo } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const UsersFilter = ({ title, options, selected, onSelectionChange, isDisabled }) => {
  const [opened, setOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleOption = (value) => {
    onSelectionChange(value);
  };

  // Сортування та фільтрація опцій
  const sortedAndFilteredOptions = useMemo(() => {
    if (!options) return [];

    // Фільтрація за пошуковим запитом
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    const filtered = options.filter(option =>
      option.toLowerCase().includes(lowerCaseSearchTerm)
    );

    const sorted = filtered.sort((a, b) => {
      const aIsSelected = selected.includes(a);
      const bIsSelected = selected.includes(b);

      // Якщо обидва обрані або обидва не обрані, сортуємо за алфавітом
      if (aIsSelected === bIsSelected) {
        return a.localeCompare(b);
      }

      // Якщо 'a' обраний, а 'b' ні, 'a' йде нагору (-1)
      if (aIsSelected) return -1;

      // Якщо 'b' обраний, а 'a' ні, 'b' йде нагору (1)
      if (bIsSelected) return 1;

      return 0;
    });

    return sorted;
  }, [options, selected, searchTerm]);

  // Функція для скидання пошуку при закритті
  const handleHeaderClick = () => {
    if (isDisabled) return;

    if (opened) {
      setSearchTerm('');
    }

    setOpened(!opened);
  };

  return (
    <div className={`users__filter users__filter--big ${isDisabled ? 'users__filter-disabled' : null}`}>
      <div
        className="users__filter-header"
        onClick={handleHeaderClick}
      >
        <span className="users__filter-title">
          {title} {selected.length === 0 ? null : `(${selected.length})`}
        </span>

        <ChevronDown
          size={18}
          className={opened ? "rotate-180" : ""}
        />
      </div>

      {opened && !isDisabled && (
        <div className="users__filter-body">

          <div className="users__filter-search">
            <input
              type="text"
              placeholder="Search options..."
              value={searchTerm}
              // Зупиняємо розповсюдження кліку, щоб не закрити дропдаун
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="users__search-input"
            />
          </div>

          {sortedAndFilteredOptions.map((option) => (
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

          {sortedAndFilteredOptions.length === 0 && (
            <span className="users__no-results">No results found for "{searchTerm}"</span>
          )}
        </div>
      )}
    </div>
  );
};