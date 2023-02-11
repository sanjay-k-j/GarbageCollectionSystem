import React, {useState} from 'react'
import httpClient from '../../utils/httpConfig'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ComplaintForm = () => {

    const locationOptions = ['Kuvempunagar', 'Shaktinagar', 'Yadavgiri', 'V V Mohalla'];
    const options = locationOptions.map((location, idx) => {
        return(
            <option key={idx} value={location}>{location}</option>
        )
    });

    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState(locationOptions[0]);

    const clearFields = () => {
      setFirstName('')
      setSecondName('')
      setDescription('')
      setLocation(locationOptions[0])
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const complaintBody = {
            firstName,
            lastName: secondName,
            description,
            location
        }
        if(!firstName && !secondName && !location && !description){
          toast.warn('Please fill in all the fields', {theme: 'colored'})
          return
        }
        else{
          try{
            const response = await httpClient.post('/api/v1/complaints', complaintBody)
            if(response.status === 201){
              clearFields()
              toast.success('Successfully lodged!', {theme: 'colored'})
            }
          }
          catch{
            toast.error('Something went wrong', {theme: 'colored'})
          }
        }
    }

    const viewAll = (e) => {
      e.preventDefault()
      navigate('/viewComplaints')
    }

  return (
    <div className="container">
      <h1>Garbage Collection System</h1>
      <h3>Log a complaint</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input 
            id='firstName'
            type="text"
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder="Enter First name" />
        </div>
        <div className="form-control">
          <label htmlFor="secondName">Second Name</label>
          <input 
            id='secondName'
            type="text" 
            value={secondName} 
            onChange={(e) => setSecondName(e.target.value)} 
            placeholder="Enter Second Name" />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input 
            id='description'
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Enter Description" />
        </div>
        <div className="form-control">
          <label htmlFor="location"> Location </label> <br />
          <select 
            id='location'  
            value={location}
            onChange={(e) => setLocation(e.target.value)}>
                {options}
          </select>
        </div>
        <button className="btn">Submit</button>
      </form>
      <button 
        onClick={(e) => viewAll(e)}
        className="btn">View All Complaints</button>
    </div>
  )
}

export default ComplaintForm