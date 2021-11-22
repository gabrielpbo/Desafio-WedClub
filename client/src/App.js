import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";


export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  const handleRegisterusers = () => {
    
    Axios.post("http://localhost:3001/search", {
      email: values.email,
    }).then((response) => {
      if (response.data.length > 0) {
        alert('Email já cadastrado');
        return;
      } 
      setValues({name:'',  email:'', tel:''});
        
        Axios.post("http://localhost:3001/register", {
          name: values.name,
          email: values.email,
          tel: values.tel,
        })
        .then((response) => {
          console.log(response);
          
          Axios.post("http://localhost:3001/search", {
            name: values.name,
            email: values.email,
            tel: values.tel,
          })
          .then((response) => {
            setListCard([
              ...listCard,
              {
                id: response.data[0].id,
                name: values.name,
                email: values.email,
                tel: values.tel,
              },
            ]);
          });
        });
      })
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Cadastro</h1>

        <input
          type="text"
          name="name"
          value={values?.name}
          placeholder="Nome"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={values?.email}
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="tel"
          placeholder="Telefone"
          name="tel"
          value={values?.tel}
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterusers} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          name={val.name}
          email={val.email}
          tel={val.tel}
        />
      ))}
    </div>
  );
}