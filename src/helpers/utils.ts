export const getMutatedMomgooseField = (field: any) => {
    const newField: any = { ...field };
    delete newField.password;
    return newField;
};