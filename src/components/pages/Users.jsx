import { UsersFilter } from "./UsersFilter";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import "./Users.css";

export const Users = () => {
    const users = [
        {
            id: 1,
            name: "Andrey Olishchuck",
            department: "Digital marketing",
            country: "Ukraine",
            status: "Active",
        },
        {
            id: 2,
            name: "Andrey Olishchuck",
            department: "Digital marketing",
            country: "Ukraine",
            status: "Active",
        },
        {
            id: 3,
            name: "Andrey Olishchuck",
            department: "Digital marketing",
            country: "Ukraine",
            status: "Active",
        },
    ];

    const departmentOptions = ["Marketing", "Sales", "IT", "HR"];
    const countyOptions = ["Kyiv", "Lviv", "Odesa", "Kharkiv"];
    const statusOptions = ["Active", "Inactive", "On Hold"];

    const [selectedDepartments, setSelectedDepartments] = useState(["Marketing"]);
    const [selectedCounties, setSelectedCounties] = useState(["Kyiv", "Lviv"]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    const createToggleHandler = (currentSelected, setCurrentSelected) => (value) => {
        setCurrentSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const toggleDepartment = createToggleHandler(selectedDepartments, setSelectedDepartments);
    const toggleCounty = createToggleHandler(selectedCounties, setSelectedCounties);
    const toggleStatus = createToggleHandler(selectedStatuses, setSelectedStatuses);

    return (
        <div className="users">
            <h2 className="users__title">USERS</h2>

            <p className="users__note">
                Please add at least 3 departments to be able to proceed next steps.
            </p>

            <div className="users__filters">
                {/* Фільтр 1: Department */}
                <UsersFilter
                    title="Department"
                    options={departmentOptions}
                    selected={selectedDepartments}
                    onSelectionChange={toggleDepartment}
                />

                {/* Фільтр 2: Select county */}
                <UsersFilter
                    title="Select county"
                    options={countyOptions}
                    selected={selectedCounties}
                    onSelectionChange={toggleCounty}
                />

                {/* Фільтр 3: All Statuses */}
                <UsersFilter
                    title="All Statuses"
                    options={statusOptions}
                    selected={selectedStatuses}
                    onSelectionChange={toggleStatus}
                />

                <button className="users__icon-btn">
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
                    {users.map((user) => (
                        <div className="users__row" key={user.id}>
                            <span className="users__name">{user.name}</span>
                            <span className="users__info">{user.department}</span>
                            <span className="users__info">{user.country}</span>
                            <span className="users__info">{user.status}</span>
                            <button className="users__delete-btn">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};