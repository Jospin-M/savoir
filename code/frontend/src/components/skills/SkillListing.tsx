import styles from "./Skills.module.css";

import { useState, useRef, type JSX, useEffect } from "react";
import { useSkillData } from "../../hooks/useSkillsData";
import { createProficiencyLevel } from "../profile/sidebar/Sidebar";
import type { AuthenticatedSkill } from "../../../lib/queryFunctions";

/**
 * Makes use of the user's average rating to determine how the rating stars should be displayed.
 *  
 * @param options the user's average rating
 */
export function createRatingLevel(rating: number) {
    const wholeStars = Math.floor(rating);
    const fractionalStars = rating - wholeStars;
    const halfStars = Math.round(fractionalStars / 0.5);
    const emptyStars = 5 - wholeStars - halfStars;

    const starAmounts = [
        { amount: wholeStars, style: "ri-star-fill" },
        { amount: halfStars, style: "ri-star-half-fill" },
        { amount: emptyStars, style: "ri-star-line" }
    ];

    function createStars(count: number, className: string) {
        return Array.from({ length: count }, (_) => {
            return <i className={className} key={Math.random().toString()}/>
        });
    }
    
    const ratingLevel: JSX.Element[] = [];
    starAmounts.forEach(({ amount, style }) => {
        ratingLevel.push(...createStars(amount, style));
    });

    return ratingLevel;
}

function Header({ skillName, categoryName }: { skillName: string, categoryName: string } ) {
    return (
        <div className={styles.skill_header}>
            <h3 className={styles.skill_title}>{skillName}</h3>
            
            <span className={styles.skill_category}>
                {categoryName}
            </span>
        </div>
    );
}

function Level({ level }: { level: string }) {
    return (
        <div className={styles.skill_level}>
            <span className={styles.skill_level}>{level}</span>
            
            {createProficiencyLevel(["Advanced", "Intermediate", "Beginner"], level)}
        </div>
    );
}

function Stats({ average, count }: { average: number, count: number } ) {
    return (
        <div className={styles.skill_stats}>
            <div className={styles.stat}>
                <span className={styles.stat_value}>8</span>
                <span className={styles.stat_label}>Sessions</span>
            </div>

            <div className={styles.stat}>
                <div className={styles.rating}>{createRatingLevel(average)}</div>
                <span className={styles.stat_label}>{average} ({count}) reviews</span>
            </div>
        </div>
    );
}

function ToggleSwitch({ skill }: { skill: AuthenticatedSkill }) {
    const activeStyling = skill.active ? `${styles.active}`: "";
    const [active, setActive] = useState(skill.active);

    return (
        <div className={styles.toggle_container}>
            <span className={styles.toggle_label}>Active</span>
            
            <label className={styles.toggle}>
                <input 
                    type="checkbox"
                    checked={active}
                    onChange={() => {}}
                    onClick={() => {
                        setActive(!active);
                        skill.active = !active
                    }}
                />

                <span className={`${styles.slider} ${activeStyling}`}></span>
            </label>
        </div>
    );
}

function Buttons() {
    return (
        <div className={styles.action_buttons}>
            <button className={styles.action_btn}>
                <i className="ri-edit-line"/>
            </button>

            <button className={styles.action_btn}>
                <i className="ri-delete-bin-line"/>
            </button>
        </div>
    );
}

function Actions({ skill }: { skill: AuthenticatedSkill }) {
    return (
        <div className={styles.skill_actions}>
            <ToggleSwitch skill={skill}/>
            <Buttons />
        </div>
    );
}

/**
 * Normalizes all .skill_card elements to a uniform height by matching them to the tallest card
 * for consistent layout.
 */
function equalizeHeights() {
    const allCards = document.querySelectorAll(`.${styles.skill_card}`) as NodeListOf<HTMLElement>;
            
    // Reset heights
    allCards.forEach(card => card.style.height = 'auto');
    
    // Find tallest card
    const heights = Array.from(allCards).map(card => card.offsetHeight);
    const maxHeight = Math.max(...heights);
    
    // Set all cards to max height
    allCards.forEach(card => {
        card.style.height = `${maxHeight - 50}px`;
    });
}

export function SkillListing({ skill }: { skill: AuthenticatedSkill }) {
    const { categories } = useSkillData();
    const categoryName = categories?.find(category => category.id === skill.category_id)?.name;
    const reviews = { average: 4.5, count: 8 }; // will be replaced with actual review information from the db once implemented

    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Run after render
        const timer = setTimeout(equalizeHeights, 0);

        // Also run on window resize
        window.addEventListener('resize', equalizeHeights);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', equalizeHeights);
        };
    });

    return (
        <div ref={cardRef} className={styles.skill_card} >
            <Header skillName={skill.name} categoryName={categoryName!} />
            <Level level={skill.level}/>
            
            <div className={styles.skill_description}>
                {skill.description}
            </div>

            <Stats average={reviews.average} count={reviews.count} />
            <Actions skill={skill}/>
        </div>
    );
}