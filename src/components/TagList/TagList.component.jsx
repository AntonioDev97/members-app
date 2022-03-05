import React from 'react'
import PropTypes from 'prop-types';
import { Button, Tag } from 'carbon-components-react';
import { AddAlt32 } from '@carbon/icons-react';
import './TagList.style.scss';

const TagList = ({ labelText, value, name, onChange, onRemove }) => {

    const handleNewTag = (e) => {
        e.preventDefault();
        const tagInput = document.getElementById('add-item-tag');
        const newValue = tagInput.value;
        if (newValue && newValue !== '' && newValue.trim() !== '') {
            tagInput.value = '';
            const event = { target: { name, value: newValue } };
            onChange(event);
        }
    };

    return(
        <div id='taglist' className='bx--form-item'>
            <label className='bx--label'> {labelText} </label>
            <div className='taglist-input'>
                { Array.isArray(value) && value.map((item, index) =>
                    <Tag 
                    filter 
                    key={`tagItem-${index}-${item}`} 
                    onClose={e => onRemove(index)}> 
                        { item }
                    </Tag>
                ) }
                <div id='new-tag-container'>
                    <input id='add-item-tag' name='add-tag' />
                    <Button
                    className='add-button-tag'
                    renderIcon={AddAlt32}
                    onClick={handleNewTag}
                    type='button'> </Button>
                </div>
            </div>
        </div>
    );
};

TagList.propTypes = {
    labelText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(PropTypes.string),
}

export default TagList;