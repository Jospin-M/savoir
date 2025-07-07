import { NavLink } from "react-router-dom";

import styles from "./Common.module.css";

type ImageProps = {
    imageUrl: string;
    cssClass: string;
    destination: string;
    isActiveStyle: object;
}

export default function Picture({ imageUrl, cssClass, destination, isActiveStyle }: ImageProps) {
    return (
        <NavLink 
            to={destination} 
            style={({ isActive }) => isActive ? isActiveStyle: {}}
        >
            <img className={styles[cssClass]} src={imageUrl}/>
        </NavLink>
    );
}