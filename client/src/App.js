import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

const API = "http://localhost:5000";

function App() {

  const [people, setPeople] = useState([]);
  const [form,setForm]=useState({name:"",age:""});
  const[editId,setEditId]=useState(null);

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    const res = await axios.get(API);
    setPeople(res.data);
  };

  const addPerson = async()=>{
    if(!form.name|| !form.age)
      return alert("Enter name and age!");
      const res=await axios.post(API,{name:form.name,age:Number(form.age)});
      setPeople([...people,res.data]);
      setForm({name:"",age:""});

    
  }
  //start the edit function
  // const startEdit=(p)=>{
  //   setImmediate(p._id);
  //   setForm({name:p.name,age:p.age});
  // }
  const starEdit =(p)=>{
    setEditId(p._id);
    setForm({name:p.name,age:p.age})
  }
 //update the function
 const updatePerson =async()=>{
  const res =await axios.put(`${API}/${editId}`,form);
  setPeople(people.map(p=>p._id === editId? res.data :p));
  setEditId(null);
  setForm({name:"",age:""});
 };
 //delete the functionn 
 const deletePerson = async (id) => {
  try {
    await axios.delete(`${API}/${id}`);
    setPeople(people.filter(p => p._id !== id));
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

  return (
    <>
      <h3>MERN STACK CRUD - APPLICATION</h3>
      <input
        type="text"
        placeholder="Enter Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      {editId ? (<button onClick={updatePerson}>Update</button>):(<button onClick={addPerson}>Add</button>)}

      <hr/>

      {people.map(p => (
        <div key={p._id}>
          <b>{p.name}</b> - {p.age}
          <button onClick={()=>starEdit(p)}>Edit</button>
          <button onClick={()=>deletePerson(p._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;