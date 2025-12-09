import { ChevronDown } from 'lucide-react';

import './Users.css';

export const EditUsers = () => {
    return (
        <div className="edit-user">
            <h1 className="edit-user__title">EDIT USER</h1>

            <div className="edit-user__section">
                <label className="edit-user__label">User</label>
                <div className="edit-user__select-wrapper">
                    <select className="edit-user__select-field">
                        <option>Oleg Schevchenko</option>
                        <option>Ivan Petrenko</option>
                        <option>Mariia Semenova</option>
                    </select>

                    <ChevronDown className="edit-user__chevron" size={20} />
                </div>
            </div>

            <h2 className="edit-user__subtitle">User Information</h2>

            <div className="edit-user__grid">
                <div className="edit-user__field">
                    <label className="edit-user__label">Full Name</label>
                    <input type="text" defaultValue="Oleg Schevchenko" />
                </div>

                <div className="edit-user__section">
                <label className="edit-user__label">Department</label>
                <div className="edit-user__select-wrapper">
                    <select className="edit-user__select-field">
                        <option>Digital Marketing</option>
                    </select>

                    <ChevronDown className="edit-user__chevron" size={20} />
                </div>
            </div>

                <div className="edit-user__section">
                    <label className="edit-user__label">Country</label>
                    <div className="edit-user__select-wrapper">
                        <select className="edit-user__select-field">
                            <option>United States</option>
                        </select>

                        <ChevronDown className="edit-user__chevron" size={20} />
                    </div>
                </div>

                <div className="edit-user__section">
                    <label className="edit-user__label">Status</label>
                    <div className="edit-user__select-wrapper">
                        <select className="edit-user__select-field">
                            <option>Active</option>
                        </select>

                        <ChevronDown className="edit-user__chevron" size={20} />
                    </div>
                </div>
            </div>

            <div className="edit-user__buttons">
                <button className="edit-user__btn edit-user__btn--undo">Undo</button>
                <button className="edit-user__btn edit-user__btn--save" disabled>
                    Save
                </button>
            </div>
        </div>
    );
};