const reglas= [
    { "regla": "Longitud: La dirección debe tener entre 20 y 60 caracteres.",
        fn: (direccion)=> direccion.length >= 20 && direccion.length <= 60

    },
    {"regla": "Formato: Debe incluir un número de puerta o apartamento.",
        fn: (direccion)=> { const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
             return numeros.some(num=>direccion.includes(num));
        }
    },
       {"regla": "Caracteres prohibidos: No puede contener símbolos como ! @ # $ % ^ & * ( ) _ +.",
        fn: (direccion)=> { const prohibidos = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "."];
            return !prohibidos.some(c=>direccion.includes(c));
        }

    },
       {"regla": "Palabras requeridas: Debe incluir al menos una de: Calle, Avenida, Bulevar, Pasaje.",
        fn: (direccion)=> { const requeridas = ["Calle", "Avenida", "Bulevar", "Pasaje"];
          return requeridas.some(p=>direccion.includes(p));
        }

    },
    { "regla": "Consistencia: El código postal (si existe) debe estar al final de la dirección.",
        fn: (direccion)=> { 
            const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            // El código postal sólo puede estar al final de la dirección. 
            const separarItems = direccion.split(",");
            if (separarItems.length > 2){
                let ultimoItem = separarItems[separarItems.length - 1]
                //Quitar Espacios
                ultimoItem = ultimoItem.trim()
                //Convertir cadena a array de caracteres para utilizar el every()
                return ultimoItem.split("").every(c=>numeros.includes(c));
            }
            else {
                return true  }           
    }
    },
       {"regla": "Sin abreviaturas: No permite abreviaturas como Av. (debe ser Avenida).",
        fn:  fn = (direccion)=> { const abreviaturas = ["C.", "Av.", "Blv.", "Psj."];
          const palabras = direccion.split(" ");
          return !abreviaturas.some(a=>palabras.includes(a));
        }

    },

     {"regla":"Mayúsculas: La primera letra de cada palabra debe ser mayúscula.",
        fn: (direccion)=> { const separarItems = direccion.split(",");
            //trim() para quitar los espacios y flat() para aplanar el array
            const palabras = separarItems.map(p=>p.trim().split(" ")).flat();
            return palabras.every(p=>p[0] == p[0].toUpperCase())
        }
    },

];
module.exports = reglas;