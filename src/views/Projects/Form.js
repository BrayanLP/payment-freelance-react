import React, { Component } from 'react';
import { firebase } from '../../firebase/';
import routes from '../../routes';
import InputValidator from '../../components/Input/';
import { ValidatorForm } from 'react-form-validator-core';
import DateValidator from '../../components/DatePicker'; 
import Row from 'react-materialize/lib/Row'; 
import "react-datepicker/dist/react-datepicker.css";


class ProjectFrom extends Component {
    constructor(props ){
        super(props)
        this.state = {
            form: {
                name: '', 
                price: '',
                contacto: '',
                adelanto: '', 
                start_date: null,
                end_date: null,
                deposit_date: null,
                cotizacion_date: null
            }
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit = (e) =>{
        e.preventDefault() 
        const newKey = firebase.db.ref().child('proyectos').push().key; 
        let { form } = this.state; 
        let update = {};
        update[`/proyectos/${newKey}` ] = form;
        firebase.db.ref().update(update);
        return this.props.history.push(routes.project)
        
    }
    handleChange(event, value) {
        const { form } = this.state;
        form[event.target.name] = event.target.value;
        this.setState({ form })
    }
    handleChangeSelect = (date, name) => {
        const { form } = this.state
        form[name] = date
        this.setState({form})
    } 
    render() {
        const { form } = this.state
        return (
            <div>
                <h2>
                    Crear Proyecto
                </h2>
                <Row>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit} >
                    <InputValidator
                        onChange={this.handleChange} 
                        name="name" 
                        s={6} 
                        type="text"
                        label="Nombre proyecto" 
                        value={form.name } 
                        validators={['required']}
                        errorMessages={['campo requerido']} 
                    />
                    <InputValidator
                        onChange={this.handleChange} 
                        name="price" 
                        type="number" 
                        s={6} 
                        label="Precio Total" 
                        value={form.price }
                        validators={['required']}
                        errorMessages={['campo requerido']} 
                        /> 
                        
                    <InputValidator
                        onChange={this.handleChange} 
                        name="adelanto" 
                        type="number" 
                        s={6}  
                        label="Adelanto en %" 
                        value={form.adelanto }
                        validators={['required',"minNumber:0","maxNumber:100"]}
                        errorMessages={['campo requerido','Porcentaje minimo: 0','Porcentaje Maximo: 100']} 
                        />
                    <InputValidator  
                        onChange={this.handleChange} 
                        name="contacto" 
                        type="text"
                        s={6} 
                        label="Contacto" 
                        value={form.contacto }
                        validators={['required']}
                        errorMessages={['campo requerido']} 

                        /> 
                    <DateValidator
                        name="start_date"
                        selected={form.start_date }
                        onChange={(e) => this.handleChangeSelect(e, 'start_date')} 
                        value={form.start_date }
                        label="Fecha de inicio"
                        validators={['required']}
                        errorMessages={['campo requerido']} 
                    /> 
                    <DateValidator
                        name="end_date"
                        selected={form.end_date }
                        onChange={(e) => this.handleChangeSelect(e, 'end_date')} 
                        value={form.end_date }
                        label="Fecha Fin"
                        validators={['required']}
                        errorMessages={['campo requerido']} 
                    /> 
                    <DateValidator
                        name="deposit_date"
                        selected={form.deposit_date }
                        onChange={(e) => this.handleChangeSelect(e, 'deposit_date')} 
                        value={form.deposit_date }
                        label="Fecha Deposito"
                        validators={['required']}
                        errorMessages={['campo requerido']} 
                    /> 
                    <DateValidator
                        name="cotizacion_date"
                        selected={form.cotizacion_date }
                        onChange={(e) => this.handleChangeSelect(e, 'cotizacion_date')} 
                        value={form.cotizacion_date }
                        label="Fecha Cotización"
                        validators={['required']}
                        errorMessages={['campo requerido']} 
                    />
                    <div className="col input-field s6">
                        <button className="btn btn-waves " type="submit" >Crear</button> 
                    </div>
                    </ValidatorForm>
                </Row>
            </div>
        );
    }
}

export default ProjectFrom;