import { gql } from '@apollo/client'

// const GET_USERALL = gql`
//     query GetUserAll($options: PageQueryOptions){
//         users(options: $options){
//                 data{
//                     id
//                     name
//                     username
//                     email
//                 }
//         }
//     }
// `
const GET_USERALL = gql`
    query GetUserAll($page: Int!, $limit: Int!){
        users(options: { paginate: { page: $page, limit: $limit }} ){
                data{
                    id
                    name
                    username
                    email
                } meta {
                    totalCount
                }
        }
    }
`
export default GET_USERALL