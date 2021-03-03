import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import schemaUser from '../schema/schemaUser'
import { yupResolver } from '@hookform/resolvers/yup'

import GET_USER_ID from '../libe/query_mado/UserId'
import UPDATE_USER from '../libe/query_mado/UserUpdate'

import { useMutation, useQuery } from '@apollo/client'
import swal from 'sweetalert'

const EditUser = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_USER_ID, {
        variables: { id: id }
    })
    const [UpdateUser, { data:dataUpdate }] = useMutation(UPDATE_USER)
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schemaUser)
    })
    // errors
    const doSubmit = (data) => {
        // console.log(data)
        swal("Good job!", "You clicked the button!", "success").then(() => {
            UpdateUser({ variables: {id: id, input: data} })
        });
    }

    if (loading) return (<p>Loading...</p>)
    if (error) return (<p>Error</p>)
    // console.log(data.user.name)
    return <>
      {dataUpdate &&
            <div class="container col-7 mt-3 alert alert-success" role="alert">
                {JSON.stringify(dataUpdate)}
            </div>
        }
        <div className="container col-4 mt-5">
            <h1>EditUser</h1>
            {/* { JSON.stringify(dataUpdate) } */}
            <form onSubmit={handleSubmit(doSubmit)}>
                <div className="form-group" >
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        className="form-control"
                        defaultValue={data.user.name}
                        ref={register}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="form-group">
                    <label>UserName:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter UserName"
                        className="form-control"
                        defaultValue={data.user.username}
                        ref={register}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        className="form-control"
                        defaultValue={data.user.email}
                        ref={register}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <button className="btn btn-success mr-2" ><i class="fa fa-check" aria-hidden="true"></i> Save</button>
                {/* <button className="btn btn-danger " >Cancel</button> */}
                <Link to="/" className="btn btn-danger" ><i class="fa fa-times" aria-hidden="true"></i> Cancel</Link>
            </form>
        </div>
    </>
}
export default EditUser
