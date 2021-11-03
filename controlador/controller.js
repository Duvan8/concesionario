const connection = require('../conexion/conexion');//EN ESTE NOS VAMOS A LA CARPETA DONDE SE CONECTA CON LA BASE DE DATOS
const cnn = connection();//HACE LA CONEXION
const { render } = require('ejs');//SE REQUIEREN LOS PAQUETES EJS
const bcryptjs = require('bcryptjs');
const controller = {};

//SE LLAMA LA VISTA DEL LOGIN
controller.index = (req, res, next) => {
    res.render('login')
    res.send("error en controlador");
}


//bloque para insertar usuarios
controller.consultageneral = (req, res, next) => {
    if (req.session.login) {

        cnn.query('SELECT * FROM  usuarios', (err, resbd) => {
            if (err) {
                next(new Error(err))
                console.log("Error en la consultas")
            }
            else {
                console.log(resbd)
                res.render('consultas', { datos: resbd });
            }
        })
    }
    else {
        res.redirect('/');
    }
}



//SE ENVIA A LA BASE DE DATOS
controller.insertar = async (req, res, next) => {
    const d = req.body.datid;
    const u = req.body.usuid;
    const c = req.body.datnombre;
    const r = req.body.datapellido;
    const e = req.body.datipoid;
    const i = req.body.datnumeroid;
    const t = req.body.datelefono;
    const o = req.body.datcorreo;

    cnn.query('INSERT INTO datospersonales SET?', { datid: d, usuid: u, datnombre: c, datapellido: r, datipoid: e, datnumeroid: i, datelefono: t, datcorreo: o }, (err, resbd) => {

        if (err) {
            next(new Error(err));
        }
        else {
            //console.log(resbd);

            //res.render('index',{datos:respbd})
            res.redirect('vistadmin');
        }


    });
}
controller.insercategoria = async (req, res, next) => {
    const d = req.body.catid;
    const u = req.body.catipo;

    cnn.query('INSERT INTO categoria SET?', { catid: d, catipo: u}, (err, resbd) => {

        if (err) {
            next(new Error(err));
        }
        else {
            //console.log(resbd);

            //res.render('index',{datos:respbd})
            res.redirect('usucliente');
        }


    });
}

controller.insusucli = async (req, res, next) => {
    const di = req.body.tiprol;
    const ui = req.body.id;

    cnn.query('INSERT INTO usuariorol SET?', { rolid: ui, usuid: di}, (err, resbd) => {

        if (err) {
            next(new Error(err));
        }
        else {
            //console.log(resbd);

            //res.render('index',{datos:respbd})
            res.redirect('lineas');
        }


    });


}
controller.usucuenta = async (req, res, next) => {
    const cd = req.body.usuid;
    const pq = req.body.usulogin;
    const tp = req.body.usupassword;
    const password = await bcryptjs.hash(tp, 8)

    cnn.query('INSERT INTO usuario SET?', { usulogin: pq, usuid: cd, usupassword: password}, (err, resbd) => {

        if (err) {
            next(new Error(err));
        }
        else {
            //console.log(resbd);

            //res.render('index',{datos:respbd})
            res.redirect('/dtscliente');
        }


    });


}
controller.insercreditos = async (req, res, next) => {
    const cc = req.body.vehplaca;
    const dc = req.body.datid;
    const cd = req.body.catid;
    const mc = req.body.vehmodelo;
    const fc = req.body.vehmarca;
    const pc = req.body.vehestado;
    const pr = req.body.vehprecio;

    cnn.query('INSERT INTO vehiculo SET?', { vehplaca: cc, datid: dc, catid: cd, vehmodelo: mc, vehmarca: fc, vehestado: pc,vehprecio: pr }, (err, resbd) => {

        if (err) {
            next(new Error(err));
        }
        else {
            //console.log(resbd);

            //res.render('index',{datos:respbd})
            res.redirect('usucliente');
        }


    });


}

controller.mostrar = async (req, res, next) => {
    cnn.query('SELECT * FROM usuario ', [req.session.usss], (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('dtscliente', { datos: resbd });
        }
    })
}
controller.acliente = async (req, res, next) => {
    cnn.query('SELECT * FROM datospersonales', [req.session.usss], (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('acliente', { datos: resbd });
        }
    })
}
controller.telefono = async (req, res, next) => {
    const cat = await req.body.catid;
    console.log("documento "+cat)
    cnn.query('SELECT * FROM datospersonales WHERE usuid="'+100+'"', [req.session.usss], (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('telefono', { datos: resbd });
        }
    })
}
controller.lineas = async (req, res, next) => {
    cnn.query('SELECT * FROM usuariorol', [req.session.usss], (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('lineas', { datos: resbd });
        }
    })
}
controller.creditos = async (req, res, next) => {
    cnn.query('SELECT * FROM vehiculo', [req.session.usss], (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('creditos', { datos: resbd });
        }
    })
}
controller.cuentas = async (req, res, next) => {
    cnn.query('SELECT * FROM datospersonales WHERE datid="'+1+'"', [req.session.usu], (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('cuentas', { datos: resbd });
        }
    })
}
controller.usucuentas = async (req, res, next) => {
    cnn.query('SELECT * FROM cuentas', [req.session.usss], (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('usucuentas', { datos: resbd });
        }
    })
}


controller.usucliente = async (req, res, next) => {
    cnn.query('SELECT * FROM vehiculo', (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('usucliente', { datos: resbd });
        }
    })
}
controller.usulineas = async (req, res, next) => {
    cnn.query('SELECT * FROM lineas INNER JOIN usuarios on(usuarios.doccli=usuarios.doccli) WHERE nomusu=?', [req.session.usss], (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('usulineas', { datos: resbd });
        }
    })
}

controller.transferir = async (req, res, next) => {
    cnn.query('SELECT * FROM cliente', (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('transferir', { datos: resbd });
        }
    })
}
controller.consignar = async (req, res, next) => {
    cnn.query('SELECT * FROM datospersonales', (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('consignar', { datos: resbd });
        }
    })
}
controller.retirar = async (req, res, next) => {
    const categoria = await req.body.categoria;
    console.log(categoria)

    cnn.query('SELECT * FROM categoria INNER JOIN vehiculo ON (categoria.catid=vehiculo.catid) WHERE catipo="'+ categoria +'"', (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd);
            res.render('retirar', { datos: resbd });
        }
    })
}

controller.usucreditos = async (req, res, next) => {
    cnn.query('SELECT * FROM usuariorol', [req.session.usss], (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('usucreditos', { datos: resbd });
        }
    })
}
//VALIDAR AL USUARIO A LA HORA DE ENTRAR
controller.login = async (req, res, next) => {
    const usu = await req.body.nomusu;
    const cla = await req.body.login;
    const password = await bcryptjs.hash(cla, 8);
    console.log(usu, cla);
    /*const usu = req.body.Usuario;
    const cla = await req.body.Clave;
    console.log(usu + cla);*/
    
    cnn.query('SELECT * FROM usuario WHERE usulogin=?', [usu], async (err, results) => {
        if (err) {
            next(new Error("Error de consulta", err));

        }
        else if (results != 0 && await (bcryptjs.compare(cla, results[0].usupassword))) {
            usuid = results[0].usuid;
            console.log(usuid)

            cnn.query('SELECT * FROM usuariorol WHERE usuid=?', [usuid], async (err, results) => {
                rol = results[0].rolid;
                console.log(rol)
                cnn.query('SELECT * FROM datospersonales WHERE usuid=?', [usuid], async (err, results) => {
                    switch (rol) {
                        case 1:
                            res.redirect('clinete')
                            break;

                        case 2:
                            res.redirect('usuarios')
                            break;

                        case 3:
                            res.redirect('vistadmin')
                            break;
                    }
                })
            })

        }
        else {
            console.log("Datos incorrectos");
            res.redirect('/');
        }
    })
}
controller.rango = async (req, res, next) => {
    const desde = await req.body.inicia;
    const hasta = await req.body.termina;
    console.log(desde,hasta)

    cnn.query('SELECT * FROM vehiculo WHERE vehprecio < "'+ desde +'" AND vehprecio > "'+ hasta +'" ', (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd);
            res.render('rango', { datos: resbd });
        }
    })
}
controller.vistcliente = async (req, res, next) => {
    cnn.query('SELECT * FROM rol', [req.session.usss], (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('vistcliente', { datos: resbd });
        }
    })
}

/*
'SELECT * FROM vehiculo WHERE vehprecio < "'+ desde +'" AND vehprecio > "'+ hasta +'" '
cnn.query('SELECT * FROM usuariorol WHERE usuid=?', [usu], async (err, results) => {
    //este if nos sirve para que nos direcione al error
    if (err) {
        next(new Error("Error de consulta login", err));
    }
    //nos sirve para encontrar solo al usuario
    if ((results != 0)) {
        console.log("primer if prueba", (results[0].clave));
        //este es para encontrar la contraseña
        if ((bcryptjs.compare(cla, results[0].clave))) {
            console.log("datos correctos segundo");
            //res.redirect('consultas');
            let rol = results[0].rol;
            let usu = results[0].nomusu;
            req.session.login = true; //se genera la variable de sesion
            console.log(rol);
            rol = results[0].rol;
            uss = results[0].nomusu;
            req.session.doccc = results[0].doccli;
            req.session.usss = results[0].nomusu
            switch (rol) {
                case '100':
                    res.redirect('clinete');
                    break;
                case '200':
                    res.redirect('usuarios');
                    break;
                case '300':
                    res.redirect('vistadmin');
                    break;
            }
        }
        else {
            console.log("datos incorrectos segundo else");
            res.redirect('/');
        }
    }
    else {
        console.log(results[0].usu, results[0].clave);
        console.log("datos incorrectos");

    }
});*/


controller.clinete = (req, res, next) => {
    console.log("EN LA VISTA DEL cliente");
    res.render('clinete');
}
controller.vistadmin = (req, res, next) => {
    res.render('vistadmin');
}
controller.usuarios = (req, res, next) => {
    res.render('usuarios');
}
controller.transferir = (req, res, next) => {
    res.render('transferir');
}
controller.personal = (req, res, next) => {
    res.render('personal');
    res.redirect('personal');
}
controller.actualizar = async (req, res, next) => {
    const docx = req.body.dd;
    const usux = req.body.uu;
    const clax = req.body.cc;
    const password = await bcryptjs.hash(clax, 8)

    cnn.query('UPDATE usuario SET usuid="' + docx + '",usulogin="' + usux + '",usupassword="' + password + '" WHERE usuid="' + docx + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('dtscliente');
        }
    })
}
controller.actuvendedor = async (req, res, next) => {
    const dat = req.body.dd;
    const nom = req.body.nn;
    const ape = req.body.aa;
    const tel = req.body.tt;
    const cor = req.body.cc;

    cnn.query('UPDATE datospersonales SET datid="' + dat + '",datnombre="' + nom + '",datapellido="' + ape + '",datelefono="' + tel + '",datcorreo="' + cor + '" WHERE datid="' + dat + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('cuentas');
        }
    })
}
controller.acturol = async (req, res, next) => {
    const usu = req.body.uu;
    const rol = req.body.rr;
    

    cnn.query('UPDATE usuariorol SET rolid="' + rol + '",usuid="' + usu + '" WHERE usuid="' + usu + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('/');
        }
    })
}
controller.actucuentas = async (req, res, next) => {
    const usu = req.body.dd;
    const rol = req.body.uu;

        cnn.query('UPDATE usuariorol SET rolid="' + rol + '",usuid="' + usu + '" WHERE usuid="' + usu + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('usucreditos');
        }
    })
}
controller.actudts = async (req, res, next) => {
    const doci = req.body.dc;
    const nomci = req.body.nm;
    const apeci = req.body.ae;
    const corci = req.body.cr;
    const celci = req.body.cl;
    const sexci = req.body.sx;
    const fecci = req.body.fh;

    cnn.query('UPDATE cliente SET nomcli="' + nomci + '",apecli="' + apeci + '",correocli="' + corci + '", celular="' + celci + '",sexo="' + sexci + '",fechanaccli="' + fecci + '" WHERE doccli="' + doci + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('dtscliente');
        }
    })
}
controller.actuli = async (req, res, next) => {
    const cod = req.body.cd;
    const nom = req.body.ci;
    const mont = req.body.mc;
    const plaz = req.body.pc;

    cnn.query('UPDATE lineas SET nomlinea="' + nom + '",montomaxicredito="' + mont + '", plazomaxcred="' + plaz + '",WHERE codlinea="' + cod + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('lineas');
        }
    })
}
controller.btn = async (req, res, next) => {
    const docx = req.body.dd;
    const usux = req.body.uu;
    const apex = req.body.cc;
    const corx = req.body.rr;
    const celx = req.body.ee;
    const sexx = req.body.ii;
    const fecx = req.body.ff;

    cnn.query('UPDATE cliente SET nomcli="' + usux + '",apecli="' + apex + '",correocli="' + corx + '", celular="' + celx + '",sexo="' + sexx + '",fechanaccli="' + fecx + '" WHERE doccli="' + docx + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('usucliente');
        }
    })
}
controller.actucliente = async (req, res, next) => {
    const docxc = req.body.dd;
    const d = req.body.ii;
    const u = req.body.uu;
    const c = req.body.cc;
    const r = req.body.cr;

    cnn.query('UPDATE usuarios SET datid="' + d + '",datnombre="' + docxc + '",datapellido="' + u + '",datcorreo="' + r + '",datelefono="' + c + '" WHERE datid="' + d + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('acliente');
        }
    })
}
controller.actulineas = async (req, res, next) => {
    const cod = req.body.cd;
    const nom = req.body.nm;
    const mont = req.body.mt;
    const pla = req.body.pa;


    cnn.query('UPDATE lineas SET codlinea="' + cod + '",nomlinea="' + nom + '",montomaxicredito="' + mont + '",plazomaxcred="' + pla + '"WHERE codlinea="' + cod + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('usulineas');
        }
    })
}
/*controller.actucredi = async (req, res, next) => {
    const co = req.body.cdi;
    const docu = req.body.dot;
    const cos = req.body.cts;
    const pres = req.body.ptm;
    const fec = req.body.fch;
    const pz = req.body.plz;
    

    cnn.query('UPDATE lineas SET codigocredito="'+ co +'",plazo="'+ pz +'",codlinea="'+ cos +'",montoprestado="'+ pres +'",fechaaprobada="'+ fec +'"WHERE doccli="' + docu + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('usucreditos');
        }
    })
}*/
controller.actucredi = async (req, res, next) => {
    const c = req.body.cdi;
    const d = req.body.dot;
    const t = req.body.cts;
    const p = req.body.ptm;
    const f = req.body.fch;
    const z = req.body.plz;

    cnn.query('UPDATE creditos SET codigocredito="' + c + '",codlinea="' + t + '", montoprestado="' + p + '",fechaaprobada="' + f + '",plazo="' + z + '" WHERE doccli="' + d + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Actualizado")
            res.redirect('usucreditos');
        }
    })
}
controller.dtsvendedor =  (req, res, next) => {
    const log = req.body.id;
    const doc=req.body.dd
    console.log("datos vendedor "+log)
    console.log("datos documento "+doc)
    cnn.query('SELECT * FROM datospersonales WHERE usuid="'+100+'"', (err, resbd) => {
        if (err) {
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else {
            console.log(resbd)
            res.render('dtsvendedor', { datos: resbd });
        }
    })
}

controller.elicuentas = async (req, res, next) => {
    const docm = req.body.deo;
    cnn.query('DELETE FROM cuentas WHERE doccli="' + docm + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Eliminado")
            res.redirect('usucuentas');
        }
    })
}
controller.elilin = async (req, res, next) => {
    const cod = req.body.elin;
    cnn.query('DELETE FROM lineas WHERE codlinea="' + cod + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Eliminado")
            res.redirect('usulineas');
        }
    })
}
controller.elicredi = async (req, res, next) => {
    const docy = req.body.dd;
    cnn.query('DELETE FROM vehiculo WHERE datid="' + docy + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Eliminado")
            res.redirect('usucliente');
        }
    })
}
controller.btnclieli = async (req, res, next) => {
    const doctor = req.body.yy;
    cnn.query('DELETE FROM usuario WHERE usuid="' + doctor + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        }
        else {
            console.log("Eliminado")
            res.redirect('usucliente');
        }
    })
}

controller.cli = async (req, res, next) => {
    res.redirect('acliente');
}
controller.buscar = async (req, res, next) => {
    res.redirect('rango');
}
controller.peri = async (req, res, next) => {
    res.redirect('personal');
}
controller.clo = async (req, res, next) => {
    res.redirect('dtscliente');
}
controller.cla = async (req, res, next) => {
    res.redirect('lineas');
}
controller.cle = async (req, res, next) => {
    res.redirect('creditos');
}
controller.clu = async (req, res, next) => {
    res.redirect('cuentas');
}
controller.ucu = async (req, res, next) => {
    res.redirect('usucuentas');
}
controller.usu = async (req, res, next) => {
    res.redirect('usucliente');
}
controller.tel = async (req, res, next) => {
    res.redirect('telefono');
}
controller.uso = async (req, res, next) => {
    res.redirect('usulineas');
}
controller.usi = async (req, res, next) => {
    res.redirect('usucreditos');
}
controller.cun = async (req, res, next) => {
    res.redirect('vistcliente');
}
controller.can = async (req, res, next) => {
    res.redirect('transferir');
}
controller.cin = async (req, res, next) => {
    res.redirect('retirar');
}
controller.dts = async (req, res, next) => {
    res.redirect('dtsvendedor');
}
controller.clae = async (req, res, next) => {
    res.redirect('./');
}
controller.cerrar = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}
module.exports = controller;