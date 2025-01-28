import { NavLink } from "react-router-dom";

const SettingsNav = (props: { user_id: string }) => {

    const { user_id } = props;
    const pathName = window.location.href;
    const navLinks = [`/user/settings/${user_id}`, `/user/settings/password/${user_id}`, `/user/settings/theme/${user_id}`, `/user/settings/delete-account/${user_id}`];

    return (
        <>
            <ul className="user-settings-nav">
                <li className={`${pathName.includes(navLinks[0]) ? 'active' : ''}`}>
                    <NavLink
                        to={`/user/settings/${user_id}`}
                        title="General"
                        className="nav-link"
                    >
                        General
                    </NavLink>
                </li>
                <li className={`${pathName.includes(navLinks[1]) ? 'active' : ''}`}>
                    <NavLink
                        to={`/user/settings/password/${user_id}`}
                        title="Password"
                        className="nav-link"
                    >
                        Password
                    </NavLink>
                </li>
                <li className={`${pathName.includes(navLinks[2]) ? 'active' : ''}`}>
                    <NavLink
                        to={`/user/settings/theme/${user_id}`}
                        title="Theme"
                        className="nav-link"
                    >
                        Theme
                    </NavLink>
                </li>
                <li className={`${pathName.includes(navLinks[3]) ? 'active' : ''}`}>
                    <NavLink
                        to={`/user/settings/delete-account/${user_id}`}
                        title="Theme"
                        className="nav-link danger"
                    >
                        Delete Account
                    </NavLink>
                </li>
            </ul>
        </>
    )
};

export default SettingsNav;