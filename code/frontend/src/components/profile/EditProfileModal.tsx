import styles from "./Profile.module.css";

export default function EditProfileModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    // another method should be defined to handle the updating of profile information when react query is setup
    
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
                <div className={styles.modal_header}>
                    <h2>Edit Profile</h2>
                    
                    <button className={styles.close_button} onClick={() => closeButtonHandler()}>
                        <i className={"ri-close-line"}></i>
                    </button>
                </div>

                <div className={styles.modal_body}>
                    <form>
                        <div className={styles.form_group}>
                            <label htmlFor="cover_photo">Cover Photo</label>

                            <div className={styles.modal_cover_photo}>

                            </div>

                            <button className={styles.upload_button}>
                                <i className={"ri-image-add-line"}>
                                    {" Change Cover Photo "}
                                </i>
                            </button>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="profile_photo">Profile Photo</label>

                            <div className={styles.edit_profile_photo_container}>
                                <div className={styles.edit_profile_photo_container}>
                                    <img className={styles.edit_profile_photo} src={"https://static01.nyt.com/images/2020/03/09/sports/09nba-topteams1/09nba-topteams1-mediumSquareAt3X.jpg"}/>
                                </div>

                                <button type={"button"} className={styles.upload_button}>
                                    <i className={"ri-image-add-line"}>
                                        {" Change Profile Photo "}
                                    </i>
                                </button>
                            </div>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="full_name">Full Name</label>

                            <input type="text" id="full_name" className={styles.form_control}/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="bio">Bio</label>

                            <textarea className={styles.form_control} maxLength={230} placeholder="Describe your skills, passions, and experience.">

                            </textarea>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor={"languages"}>Languages</label>
                            
                            <div className={styles.language_item}>
                                <select className={styles.language_select}>
                                    <option value={"english"} selected>English</option>
                                </select>

                                <select className={styles.proficiency_select}>
                                    <option value={"Fluent"} selected>Fluent</option>
                                </select>

                                <button type="button" className={styles.remove_language}>
                                    <i className={"ri-delete-bin-line"}/>
                                </button>
                            </div>

                            <button type={"button"} className={styles.add_language}>
                                <i className={"ri-add-circle-line"} />
                                
                                { " Add new language " }
                            </button>
                        </div>
                    </form>

                    <div className={styles.modal_footer}>
                        <button className={styles.save_button}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}