const { response, request } = require('express');
const path = require('path')

const { v4: uuidv4 } = require('uuid');
uuidv4(); 

const cargarArchivo = (req = request, res = response)=>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({msg: 'No hay archivos que subir'});
        return;
    }

    const { file } = req.files;

    const extension = file.name.split('.');
    // console.log(extension[extension.length - 1])

    const nombreUnico = uuidv4() + '.' + extension[extension.length - 1];

    uploadPath = path.join(__dirname, '../public/' + nombreUnico);

    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({err, uploadPath});
        }
        
        res.json({
            path: uploadPath, 
            filename: nombreUnico
        });
    });
};

module.exports = {
    cargarArchivo
}