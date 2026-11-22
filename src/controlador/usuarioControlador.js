//CONTROLADOR
//Se encarga de manejar la lógica de negocio y las solicitudes relacionadas con los usuarios.
const UsuarioModelo = require('../modelo/usuarioModelo');

class UsuarioControlador {
    static obtenerUsuarios(req, res) 
    {
        const usuarios = UsuarioModelo.obtenerUsuarios();
        res.status(200).json({ exito: true, datos: usuarios });
    }

    static obtenerUsuarioPorId(req, res)
    {
        const id = req.params.id;
        const usuario = UsuarioModelo.obtenerUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ exito: true, datos: usuario });
    }

    static crear(req, res)
    {
        const { nombre, correo } = req.body || {};
        if(!nombre || !correo) {
            return res.status(400).json({ exito: false, mensaje: 'Nombre y correo son requeridos' });
        }
        const nuevoUsuario = UsuarioModelo.crear({ nombre, correo });
        res.status(201).json({ exito: true, datos: nuevoUsuario });
    }

    static actualizar(req, res)
    {
        const usuarioActualizado = UsuarioModelo.actualizar(req.params.id, req.body);
        if (!usuarioActualizado) 
        {
            return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ exito: true, datos: usuarioActualizado });
    }

    static eliminar(req, res)
    {
        const eliminado = UsuarioModelo.eliminar(req.params.id);
        if(!eliminado)
        {
            return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ exito: true, mensaje: 'Usuario eliminado correctamente' });
    }

}

module.exports = UsuarioControlador;