import { useEffect, useState } from 'react';
import { 
    MemberModel,
    MemberModelError,
    MemberValidations
} from '../models/member.model';

export const useForm = (data, onFormSubmit, onInvalid) => {
    const [form, setForm] = useState(MemberModel);
    const [formError, setFormError] = useState(MemberModelError);
    useEffect(() => { if (data) setForm(data) }, [data]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const isValid = MemberValidations[name](value);
        setFormError(() => ({ ...formError,  [name]: !isValid ? true : false }));
        setForm(() => ({ 
            ...form, 
            [name]: name === 'skills' ? [...form.skills, value]: value 
        }));
    };

    const handleClassDateChange = (date) => {
        const classDate = new Date(date).toLocaleDateString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' });
        if (formError.classCompletionDate) setFormError(() => ({ ...formError,  classCompletionDate: false }));
        setForm(() => ({ ...form, classCompletionDate: classDate }));
    };

    const handleRemoveSkill = (index) => {
        const newSkills = [ ...form.skills ];
        newSkills.splice(index, 1);
        setForm(() => ({ ...form, skills: [ ...newSkills ] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isInvalidForm = false;
        Object.keys(formError).forEach(formItem => {
            if (formError[formItem]) isInvalidForm = true;
            if (form[formItem] === '') isInvalidForm = true;
        });
        if (!isInvalidForm) onFormSubmit(form);
        else onInvalid();
    };

    return {
        form,
        formError,
        handleChange,
        handleClassDateChange,
        handleRemoveSkill,
        handleSubmit,
    }
};