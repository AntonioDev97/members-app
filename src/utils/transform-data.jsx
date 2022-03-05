export const TransformMemberDataList = (data) => {
    return data.map(member => ({
        ...member,
        id: member._id,
        
    }));
};