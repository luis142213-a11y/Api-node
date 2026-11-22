
//CONTROLADOR
//Se encarga de manejar la lógica de negocio y las solicitudes relacionadas con los usuarios.
const EmpladosModelo = require('../modelo/empleadosModelo');

class EmpleadosControlador {
    
    static async obtenerEmpleados(req, res) 
    {
        const empleados = await EmpladosModelo.obtenerTodos();
        try 
        {
            return res.status(200).json({exito: true, datos: empleados});

        }
        catch (error)
        {
            return res.status(500).json({exito: false, mensaje: 'Error al obtener los empleados'});
        }

        }
    static async obtenerEmpleadoPorId(req, res) 
    {
        const empleado = await EmpladosModelo.obtenerPorId(req.params.id);
        try 
        {
            return res.status(200).json({exito: true, datos: empleado});

        }
        catch (error)
        {
            return res.status(500).json({exito: false, mensaje: 'Error al obtener el empleado'});
        }

    }

    static async crearEmpleado(req, res)
    {
        const { nombre, area } = req.body;
        try 
        {
            const empleado = await EmpladosModelo.crearEmpleado(nombre, area);
            return res.status(201).json({exito: true, datos: empleado});
        }
        catch (error)
        {
            return res.status(500).json({exito: false, mensaje: 'Error al crear el empleado'});
        }
    }

    static async actualizarEmpleado(req, res)
    {
        const { id } = req.params;
        const { campo, valor } = req.body;
        try 
        {
            const empleado = await EmpladosModelo.actualizarEmpleado(id, campo, valor);
            return res.status(200).json({exito: true, datos: empleado});
        }
        catch (error)
        {
            return res.status(500).json({exito: false, mensaje: 'Error al actualizar el empleado'});
        }
    }

    static async eliminarEmpleado(req, res)
    {
        const { id } = req.params;
        try
        {
            const empleado = await EmpladosModelo.eliminarEmpleado(id);
            return res.status(200).json({exito: true, datos: empleado});
        }
        catch (error)
        {
            return res.status(500).json({exito: false, mensaje: 'Error al eliminar el empleado'});
        }
    }
}

module.exports = EmpleadosControlador;