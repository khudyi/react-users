import { useState, useMemo } from "react";
import { Trash2 } from "lucide-react";

import { UsersFilter } from "./UsersFilter";

import "./Users.css";

const getUniqueOptions = (data, key) => {
    const uniqueNames = new Set(data.map(user => user[key].name));
    return Array.from(uniqueNames);
};

export const Users = ({ users: allUsersFromApp, onDeleteUser }) => {
    const DEPARTMENT_MIN_COUNT = 3;

    const userList = allUsersFromApp;

    const departmentOptions = useMemo(() => getUniqueOptions(userList, 'department'), [userList]);
    const countyOptions = useMemo(() => getUniqueOptions(userList, 'country'), [userList]);
    const statusOptions = useMemo(() => getUniqueOptions(userList, 'status'), [userList]);

    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedCounties, setSelectedCounties] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    const isOtherFiltersEnabled = selectedDepartments.length >= DEPARTMENT_MIN_COUNT;

    const resetFilters = () => {
        setSelectedDepartments([]);
        setSelectedCounties([]);
        setSelectedStatuses([]);
    };
    
    const deleteUser = (userToDelete) => {
        if (onDeleteUser) {
            onDeleteUser(userToDelete.name); 
        } else {
            console.error("Помилка: Функція onDeleteUser не передана.");
        }
    };


    const createToggleHandler = (currentSelected, setCurrentSelected, isDepartmentHandler = false) => (value) => {
        
        if (isDepartmentHandler) {
            setSelectedDepartments(prev => {
                const isCurrentlySelected = prev.includes(value);
                let newDepartments;

                if (isCurrentlySelected) {
                    newDepartments = prev.filter((v) => v !== value);

                    if (newDepartments.length < DEPARTMENT_MIN_COUNT) {
                        setSelectedCounties([]);
                        setSelectedStatuses([]);
                    }
                } else {
                    newDepartments = [...prev, value];
                }

                return newDepartments;
            });

        } else {
            if (isOtherFiltersEnabled) {
                setCurrentSelected((prev) =>
                    prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value]
                );
            }
        }
    };

    const toggleDepartment = createToggleHandler(selectedDepartments, setSelectedDepartments, true);
    const toggleCounty = createToggleHandler(selectedCounties, setSelectedCounties);
    const toggleStatus = createToggleHandler(selectedStatuses, setSelectedStatuses);

    const filteredUsers = useMemo(() => {
        return userList.filter(user => {
            const departmentMatch = selectedDepartments.length === 0 || selectedDepartments.includes(user.department.name);
            const countryMatch = selectedCounties.length === 0 || selectedCounties.includes(user.country.name);
            const statusMatch = selectedStatuses.length === 0 || (user.status.value === "ALL" || selectedStatuses.includes(user.status.name));

            return departmentMatch && countryMatch && statusMatch;
        });
    }, [userList, selectedDepartments, selectedCounties, selectedStatuses]);


    return (
        <div className="users">
            <h2 className="users__title">USERS</h2>
            
            {!isOtherFiltersEnabled && (
                <p className="users__note">
                    Please add at least 3 departments to be able to proceed next steps.
                </p>
            )}

            <div className="users__filters">
                <UsersFilter
                    title="Department"
                    options={departmentOptions}
                    selected={selectedDepartments}
                    onSelectionChange={toggleDepartment}
                />

                <UsersFilter
                    title="Country"
                    options={countyOptions}
                    selected={selectedCounties}
                    onSelectionChange={toggleCounty}
                    isDisabled={!isOtherFiltersEnabled}
                />

                <UsersFilter
                    title="All Statuses"
                    options={statusOptions}
                    selected={selectedStatuses}
                    onSelectionChange={toggleStatus}
                    isDisabled={!isOtherFiltersEnabled}
                />

                <button 
                    className="users__icon-btn"
                    onClick={resetFilters} 
                    title="Reset all filters"
                >
                    <Trash2 size={20} />
                </button>

                <button className="users__add-btn">Add User</button>
            </div>

            <div className="users__table">
                <div className="users__table-header">
                    <span>Full Name</span>
                    <span>Department</span>
                    <span>Country</span>
                    <span>Status</span>
                    <span></span>
                </div>

                <div className="users__table-body">
                    {filteredUsers.map((user, index) => (
                        <div className="users__row" key={user.name + index}> 
                            <span className="users__name">{user.name}</span>
                            <span className="users__info">{user.department.name}</span>
                            <span className="users__info">{user.country.name}</span>
                            <span className="users__info">{user.status.name}</span>
                            
                            <button 
                                className="users__delete-btn"
                                onClick={() => deleteUser(user)}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    {filteredUsers.length === 0 && (
                        <div className="users__row users__row--empty">
                            <span>No users match the selected filters.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};