import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import schemaUser from '../schema/schemaUser'
import { yupResolver } from '@hookform/resolvers/yup'
import CREATE_USER from '../libe/query_mado/UserCerate'
import { useMutation } from '@apollo/client'
import swal from 'sweetalert'


const Create = () => {

    const [CreateUser, { data }] = useMutation(CREATE_USER)

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schemaUser)
    })
    // errors
    const doSubmit = (data) => {
        swal("Good job!", "You clicked the button!", "success").then(() => {
            CreateUser({
                variables: { input: data }
            })
        });
    }
    // console.log(data)
    return <>
        {data &&
            <div class="container col-7 mt-3 alert alert-success" role="alert">
                {JSON.stringify(data)}
            </div>
        }
        <div className="container col-4 mt-5">


            <h1>CreateUser</h1>

            <form onSubmit={handleSubmit(doSubmit)}>
                <div className="form-group" >
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        className="form-control"
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
export default Create
