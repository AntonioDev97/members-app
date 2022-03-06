import moment from "moment";

export const TransformMemberDataList = (data) => data.map(member => {
    const classCompletionDate = moment(member.classCompletionDate).format('MM/DD/YYYY');
    const createdAt = moment(member.createdAt).format('MM/DD/YYYY HH:mm');    
    return {
        ...member,
        id: member._id,
        classCompletionDate,
        createdAt,
    };
});

export const TransformMemberDataById = (data) => {
    const classCompletionDate = moment(data.classCompletionDate).utc().format('MM/DD/YYYY');
    return {
        ...data,
        classCompletionDate,
        passw: '',
    }
};

export const TransformMemberDataSubmit = (data) => {
    const classCompletionDate = new Date(data.classCompletionDate).toISOString().split('T')[0]
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passw: data.passw,
        classCompletionDate,
        skills: data.skills,
        role: data.role
    }
};