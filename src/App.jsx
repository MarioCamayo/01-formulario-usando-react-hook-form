import "./App.css";
import { useForm } from "react-hook-form";

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "Luis",
      apellido: "Gonzales",
      correo: "luis@gmail.com",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
    // setValue('correo', '')
  });

  return (
    <form onSubmit={onSubmit}>
      <h1>React Hook Form</h1>

      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        id="nombre"
        {...register("nombre", {
          required: {
            value: true,
            message: "El campo nombre es requerido",
          },
          minLength: {
            value: 3,
            message: "El campo nombre debe tener al menos 3 caracteres",
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}
      {/* {errors.nombre && <span>no puede estar vacío</span>} */}

      <label htmlFor="apellido">Apellido</label>
      <input
        type="text"
        id="apellido"
        {...register("apellido", {
          required: true,
        })}
      />

      {errors.apellido && <span>no puede estar vacío</span>}

      <label htmlFor="correo">Correo</label>
      <input
        type="email"
        {...register("correo", {
          required: {
            value: true,
            message: "El campo correo es requerido",
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "El correo no es válido",
          },
        })}
      />
      {errors.correo && <span>{errors.correo.message}</span>}
      {/* {errors.correo && <span>no puede estar vacío</span>} */}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        {...register("password", {
          required: {
            value: true,
            message: "El campo password es requerido",
          },
          minLength: {
            value: 8,
            message: "El campo password debe tener al menos 8 caracteres",
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "El campo password debe tener al menos 8 caracteres, una mayúscula una minúscula, un número y un caracter especial",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      {/* {errors.password && <span>no puede estar vacío</span>} */}

      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "El campo confirmar password es requerido",
          },
          validate: (value) =>
            value === watch("password") || "Los password no coinciden",
          // validate: (value) => {
          //   if(value === watch('password') ){
          //     return true
          //   }
          //   return 'Los campos password y confirmar password deben ser iguales'
          // }
        })}
      />
      {errors.confirmarPassword && (
        <span>{errors.confirmarPassword.message}</span>
      )}

      <label htmlFor="date">Fecha de Nacimiento</label>
      <input
        type="date"
        id="date"
        {...register("date", {
          required: {
            value: true,
            message: "El campo fecha de nacimiento es requerido",
          },
          validate: (date) => {
            const fechaNacimiento = new Date(date);
            const fechaActual = new Date();
            const edad =
              fechaActual.getFullYear() - fechaNacimiento.getFullYear();

            return edad >= 18 || "Debes tener al menos 18 años";
          },
          // pattern:{
          //   value: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2 [0-9])$/,
          //       message: 'El campo fecha de nacimiento debe ser una fecha válida'
          //       }
        })}
      />

      {errors.date && <span>no puede estar vacío</span>}

      <label htmlFor="lugarNacimiento">Lugar de Nacimiento</label>
      <select
        {...register("pais", {
          required: true,
        })}
      >
        <option value="pe">Perú</option>
        <option value="ar">Argentina</option>
        <option value="br">Brasil</option>
      </select>

      {watch("pais") === "ar" && (
        <>
          <input
            type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "El campo provincia es requerido",
              },
            })}
          />
          {errors.provincia && <span>no puede estar vacío</span>}
        </>
      )}

      <label htmlFor="foto">Ingrese una foto</label>
      <input
        type="file"
        id="foto"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setValue("fotoDeUsuario", e.target.files[0].name);
        }}
      />

      {errors.date && <span>no puede estar vacío</span>}

      <label htmlFor="terminos">Terminos y condiciones</label>
      <input
        type="checkbox"
        id="terminos"
        {...register("terminos", {
          required: true,
        })}
      />

      {errors.date && <span>no puede estar vacío</span>}

      <button>Enviar</button>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
};
