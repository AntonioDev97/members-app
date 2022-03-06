import React from 'react';
import { 
    Button,
    DatePicker,
    DatePickerInput,
    Form as FormCarbon,
    FormGroup,
    Select,
    SelectItem,
    TextInput 
} from 'carbon-components-react';
import PropTypes from 'prop-types';
import { Save32, TrashCan32 } from '@carbon/icons-react';
import TagList from '../TagList';
import { useForm } from '../../hooks/useForm';
import './Form.style.scss';

const Form = ({ role, data, onFormSubmit, onInvalid, onDelete }) => {
    const { 
        form, formError,
        handleChange,
        handleClassDateChange,
        handleRemoveSkill,
        handleSubmit,
    } = useForm(data, onFormSubmit, onInvalid);

    return (
        <FormCarbon className='container-form' onSubmit={handleSubmit} >
            <FormGroup legendText='Member Form'>
                <TextInput id='firstName' labelText='First Name' type='text' name='firstName' value={form.firstName} invalid={formError.firstName} invalidText='Invalid First Name' onChange={handleChange} />
                <TextInput id='lastName' labelText='Last Name' type='text' name='lastName' value={form.lastName} invalid={formError.lastName} invalidText='Invalid Last Name' onChange={handleChange} />
                <TextInput id='email' labelText='Email' type='text' name='email' value={form.email} invalid={formError.email} invalidText='Invalid Email' onChange={handleChange} />
                <TextInput id='passw' labelText='Password' type='text' name='passw' value={form.passw} invalid={formError.passw} invalidText='Invalid Password' onChange={handleChange} />
                <DatePicker datePickerType='single' onChange={handleClassDateChange}>
                    <DatePickerInput 
                    id='classCompletionDate' 
                    labelText='Class Completion Date'
                    name='classCompletionDate'
                    value={form.classCompletionDate}
                    placeholder={'MM/DD/YYYY'}
                    invalid={formError.classCompletionDate} invalidText='Invalid Date'
                    onChange={handleChange} />
                </DatePicker>
                <TagList labelText='Skills' name='skills' value={form.skills} onChange={handleChange} onRemove={handleRemoveSkill} />
                <Select 
                id='role' 
                labelText='Role' 
                name='role' 
                value={form.role} 
                invalid={formError.role} 
                invalidText='Invalid Role' 
                defaultChecked={form.role} 
                onChange={handleChange}>
                    <SelectItem value='standard' text='Standard'/>
                    { role === 'admin' && <SelectItem value='admin' text='Admin'/> }
                </Select>
                <Button type='submit' renderIcon={Save32}> Save </Button>
                { role === 'admin' && data &&
                <Button 
                className='delete-member-button' 
                kind='danger' 
                renderIcon={TrashCan32}
                onClick={onDelete}>
                    Delete 
                </Button> }
            </FormGroup>
        </FormCarbon>
    );
};

Form.propTypes = {
    role: PropTypes.string.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onInvalid: PropTypes.func.isRequired,
    data: PropTypes.object
};

export default Form;