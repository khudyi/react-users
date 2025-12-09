import { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";

import departmentOptions from "../../data/departments.json";
import countryOptions from "../../data/countries.json";
import statusOptions from "../../data/statuses.json";

import "./EditUsers.css";

const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const EditUsers = ({ users, onUserUpdate }) => {
    const userNames = useMemo(() => users.map(u => u.name), [users]);
    const [selectedUserName, setSelectedUserName] = useState(userNames[0] || "");

    const findUser = (name) => {
        const u = users.find(user => user.name === name);
        return u ? JSON.parse(JSON.stringify(u)) : null;
    };

    const [originalUserData, setOriginalUserData] = useState(findUser(selectedUserName));
    const [editedUserData, setEditedUserData] = useState(findUser(selectedUserName));

    const isDataModified = !deepEqual(originalUserData, editedUserData);

    useEffect(() => {
        const user = findUser(selectedUserName);
        setOriginalUserData(user);
        setEditedUserData(user);
    }, [selectedUserName, users]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "fullName") {
            setEditedUserData(prev => ({ ...prev, name: value }));
            return;
        }

        const maps = {
            department: departmentOptions,
            country: countryOptions,
            status: statusOptions
        };

        const list = maps[name];
        if (!list) return;

        const selected = list.find(o => o.name === value);
        setEditedUserData(prev => ({
            ...prev,
            [name]: JSON.parse(JSON.stringify(selected))
        }));
    };

    const handleUndo = () => {
        setEditedUserData(JSON.parse(JSON.stringify(originalUserData)));
    };

    const handleSave = () => {
        if (!isDataModified) return;

        const updated = JSON.parse(JSON.stringify(editedUserData));

        onUserUpdate(updated, originalUserData.name);

        setOriginalUserData(updated);
        setSelectedUserName(updated.name);
        alert("Saved!");
    };

    if (!editedUserData) return <div>No users available</div>;

    return (
        <div className="edit-user">
            <h2 className="edit-user__title">EDIT USER</h2>

            {/* Select user */}
            <div className="edit-user__section">
                <label className="edit-user__label">User</label>

                <div className="edit-user__select-wrapper">
                    <select
                        className="edit-user__select-field"
                        value={selectedUserName}
                        onChange={(e) => setSelectedUserName(e.target.value)}
                    >
                        {userNames.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>

                    <ChevronDown className="edit-user__chevron" size={20} />
                </div>
            </div>

            <h2 className="edit-user__subtitle">User Information</h2>

            <div className="edit-user__grid">

                {/* Full name */}
                <div className="edit-user__field">
                    <label className="edit-user__label">Full Name</label>
                    <input
                        type="text"
                        className="edit-user__input"
                        name="fullName"
                        value={editedUserData.name}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Department */}
                <div className="edit-user__section">
                    <label className="edit-user__label">Department</label>

                    <div className="edit-user__select-wrapper">
                        <select
                            className="edit-user__select-field"
                            name="department"
                            value={editedUserData.department?.name || ""}
                            onChange={handleInputChange}
                        >
                            {departmentOptions.map(o => (
                                <option key={o.value} value={o.name}>{o.name}</option>
                            ))}
                        </select>

                        <ChevronDown className="edit-user__chevron" size={20} />
                    </div>
                </div>

                {/* Country */}
                <div className="edit-user__section">
                    <label className="edit-user__label">Country</label>

                    <div className="edit-user__select-wrapper">
                        <select
                            className="edit-user__select-field"
                            name="country"
                            value={editedUserData.country?.name || ""}
                            onChange={handleInputChange}
                        >
                            {countryOptions.map(o => (
                                <option key={o.value} value={o.name}>{o.name}</option>
                            ))}
                        </select>

                        <ChevronDown className="edit-user__chevron" size={20} />
                    </div>
                </div>

                {/* Status */}
                <div className="edit-user__section">
                    <label className="edit-user__label">Status</label>

                    <div className="edit-user__select-wrapper">
                        <select
                            className="edit-user__select-field"
                            name="status"
                            value={editedUserData.status?.name || ""}
                            onChange={handleInputChange}
                        >
                            {statusOptions.map(o => (
                                <option key={o.value} value={o.name}>{o.name}</option>
                            ))}
                        </select>

                        <ChevronDown className="edit-user__chevron" size={20} />
                    </div>
                </div>
            </div>

            <div className="edit-user__buttons">
                {isDataModified && (
                    <button
                        className="edit-user__btn edit-user__btn--undo"
                        onClick={handleUndo}
                    >
                        Undo
                    </button>
                )}

                <button
                    className="edit-user__btn edit-user__btn--save"
                    disabled={!isDataModified}
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};
