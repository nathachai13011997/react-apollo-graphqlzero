import * as yup from 'yup'
const schemaUser = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required()
})
export default schemaUser