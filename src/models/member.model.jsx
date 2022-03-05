import moment from 'moment';
import Validator from 'validator';

export const MemberModel = {
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    passw: '',
    classCompletionDate: '',
    skills: [],
    role: 'standard'
};

export const MemberModelError = {
    id: false,
    firstName: false,
    lastName: false,
    email: false,
    passw: false,
    classCompletionDate: false,
    skills: false,
    role: false
};

export const MemberValidations = {
    id: (value) => (typeof value === 'string' && value.length > 6),
    firstName: (value) => (typeof value === 'string' && value.length >= 1),
    lastName: (value) => (typeof value === 'string' && value.length >= 1),
    email: (value) => (typeof value === 'string' && Validator.isEmail(value)),
    passw: (value) => (typeof value === 'string' && value.length >= 6),
    classCompletionDate: (value) => {
        const isDate = moment(value, 'DD/MM/YYYY', true).isValid()
        return (typeof value === 'string' && isDate);
    },
    skills: (value) => (typeof value === 'string' && value.length >= 1),
    role: (value) => (typeof value === 'string' && value.length >= 1)
};