import React from "react";
import PropTypes from "prop-types";
import "./TaskCard.css";
import Tag from "./Tag";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

const TaskCard = ({ title, description, tags, handleDelete, handleEdit, index, setActiveCard }) => {
    return (
        <article 
            className='task_card' 
            draggable 
            onDragStart={() => setActiveCard(index)}
            onDragEnd={() => setActiveCard(null)}
        >
            <div className='task_card_header'>
                <p className='task_title'>{title}</p>
                {description && <p className='task_description'>{description}</p>}
            </div>
            <div className='task_card_bottom_line'>
                <div className='task_card_tags'>
                    {tags.map((tag, tagIndex) => (
                        <Tag key={tagIndex} tagName={tag} selected />
                    ))}
                </div>
                <div className='task_card_actions'>
                    <div
                        className="task_edit"
                        onClick={() => handleEdit(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleEdit(index);
                        }}
                    >
                        <img src={editIcon} className="edit_icon" alt="Edit task" />
                    </div>
                    <div
                        className='task_delete'
                        onClick={() => handleDelete(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleDelete(index);
                        }}
                    >
                        <img src={deleteIcon} className='delete_icon' alt="Delete task" />
                    </div>
                </div>
            </div>
        </article>
    );
};

TaskCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default TaskCard;
