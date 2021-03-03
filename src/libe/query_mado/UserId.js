import { gql } from '@apollo/client'

const GET_USER_ID = gql`
    query GetUserId($id: ID!){
        user(id: $id){
            name
            username
            email
        }
    }
`
export default GET_USER_ID