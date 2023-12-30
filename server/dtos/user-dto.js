//user-dto.js   data transfer object
// DTO используется для представления данных пользователя в упрощенной форме,
// содержащей только указанные свойства.
  const createUserDto = (model) => {
  return {
    email: model.email,
    id: model._id,
    isActivated: model.isActivated,
  }
}
export default createUserDto;