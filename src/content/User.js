import React, { useState, useEffect } from 'react'
import GET_USERALL from '../libe/query_mado/UserAll'
import DELETE_USER from '../libe/query_mado/UserDelete'

import { useQuery, useMutation } from '@apollo/client'

import Input from '../component/Input'

import { Link } from 'react-router-dom'
import swal from 'sweetalert'

import '../App.css'

const User = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [count, setCount] = useState([])

    const { loading, error, data } = useQuery(GET_USERALL, {
        variables: { page: page, limit: limit }
    })

    useEffect(() => {
        if (data) {
            const currentPage = Math.ceil(data.users.meta.totalCount / limit)
            console.log(currentPage)
            setCount(new Array(currentPage).fill())
        }
    }, [data, limit])

    const addLimit = (lim) => {
        setLimit(parseInt(lim))
        setPage(1)
    }

    const onClickPage = (id) => {
        setPage(id)
    }

    const [DeleteUser, { data: dataDelete }] = useMutation(DELETE_USER)

    const onClickDelete = (id) => {
        // console.log(id)

        swal({
            title: "Are You Sure",
            text: "Onec deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal({
                    title: "Delete successfulry!",
                    text: "You clicked the button!",
                    icon: "success",
                    button: "OK!",
                }).then((willDelete) => {
                    if (willDelete) {
                        DeleteUser({ variables: { id: id } })
                    }
                })

            }
        })
        // dataDelete.deleteUser

    }

    if (loading) return (<p>Loading...</p>)
    if (error) return (<p>Error </p>)
    // console.log(data.users.data)
    return <>
        <div className="container col-7 mt-5">
            {console.log(count)}
            <div className="form-inline row">
                <div className="col">
                    <Link to="/create" className="btn btn-primary my-3 "  ><i class="fa fa-plus"></i> Create</Link>
                </div>
                <div className="col-1">
                    <label className="float-right">Limit: </label>
                </div>
                <div className="col-2 ">
                    <Input addLimit={addLimit} />
                    {/* <input onChange={onChangeLimit} value={limit} type="text" className="form-control col" /> */}
                </div>

            </div>

            {dataDelete && JSON.stringify(dataDelete.deleteUser)}
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th className="center" scope="col">Edit</th>
                        <th className="center" scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.users.data.map((data, index) => {
                        return (
                            <tr key={index} >
                                <th >{data.id}</th>
                                <td>{data.name}</td>
                                <td>{data.username}</td>
                                <td>{data.email}</td>
                                <td className="center" ><Link to={`/edit/${data.id}`} className="btn btn-warning" ><i class="fa fa-pencil" aria-hidden="true"></i> Edit</Link></td>
                                <td className="center" ><button type="submit" onClick={() => { onClickDelete(data.id) }} className="btn btn-danger" ><i class="fa fa-times" aria-hidden="true"></i> Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {count.map((count, index) => {
                        let pageNO = index + 1;
                        return (
                            <li key={index} onClick={() => { onClickPage(pageNO) }} className={`page-item ${page === pageNO ? "active" : ""}`}><button className="page-link" >{pageNO}</button></li>
                        )
                    })}

                </ul>
            </nav>
        </div>
    </>
}
export default User
