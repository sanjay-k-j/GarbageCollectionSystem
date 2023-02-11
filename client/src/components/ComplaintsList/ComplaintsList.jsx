import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import httpClient from '../../utils/httpConfig'
import { useNavigate } from 'react-router-dom'

const ComplaintsList = () => {

  const [complaints, setComplaints] = useState([])
  const navigate = useNavigate();

  const handleCancel = async (e, id) => {
    e.preventDefault()
    try{
      const response = await httpClient.delete(`/api/v1/complaints/${id}`)
      if(response.status === 200){
        toast.success('complaint deleted!', {theme:'colored'})
        setComplaints(complaints.filter((complaint) => complaint._id !== id))
      }
      else{
        toast.error('something went wrong!', {theme:'colored'})
      }
    }
    catch{
      toast.error('something went wrong!', {theme:'colored'})
    }
  }

  const handleBack = (e) => {
    e.preventDefault();
    return navigate('/')
  }

  const complaintList = complaints.map(({firstName, lastName, description, location, _id}) => {
    return (
      <tr key={_id}>
        <td> {firstName} </td>
        <td> {lastName} </td>
        <td className='desc'> {description} </td>
        <td> {location} </td>
        <td> <button className='cancel' onClick={(e) => handleCancel(e, _id)}>X</button> </td>
      </tr>
    )
  });

  const fetchData = async () => {
    const response = await httpClient.get('/api/v1/complaints');
    setComplaints(response.data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='tableList'>
      <h3>All Complaints</h3>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {complaintList}
        </tbody>
      </table>
      <button className='btn' style={{width:'10rem', margin:'auto', marginTop:'2rem'}} onClick={(e) => handleBack(e)}>Go Back</button>
    </div>
  )
}

export default ComplaintsList