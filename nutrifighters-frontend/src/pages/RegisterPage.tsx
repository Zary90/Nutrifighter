import React, { useState } from 'react';
import  Button  from "../components/ui/button"
import  Input  from "../components/ui/input"
import  Label  from "../components/ui/label"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { motion } from 'framer-motion';

// Define el esquema de validación para el formulario de registro
const registerSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
  fechaDeNacimiento: z.date().optional(),
  altura: z.number().optional(),
  peso: z.number().optional(),
  sexo: z.enum(['masculino', 'femenino', 'otro']).optional(),
});

// Define el tipo para los datos del formulario
type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [registerError, setRegisterError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


  // Inicializa el formulario con react-hook-form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema), // Usa zod para la validación del esquema
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
      fechaDeNacimiento: undefined,
      altura: undefined,
      peso: undefined,
      sexo: undefined,
    },
  });

  // Función que se llama al enviar el formulario
  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setRegisterError(null);
    try {
       await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Datos del formulario:', data);
      // Lógica para registrar al usuario en el backend
      // Si el registro es exitoso, redirigir al usuario a la página de inicio de sesión
      // Si no, mostrar un mensaje de error
        if (data.email === 'test@example.com') {
        setRegisterError('El email ya está registrado.');
      } else {
        // Registro exitoso
         console.log('Registro exitoso');
        // Redirigir a la página de inicio de sesión
       // window.location.href = '/login'; // No uses window.location.href en React, usa react-router-dom
      }

    } catch (error: any) {
      setRegisterError(error.message || 'Ocurrió un error al registrarse.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
       initial={{ opacity: 0, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fechaDeNacimiento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura (metros)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Altura" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="peso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Peso" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sexo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <select {...field} className="border border-gray-300 rounded-md p-2 w-full">
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {registerError && (
              <p className="text-red-500 text-sm">{registerError}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </Button>
             <p className="text-center text-gray-500 text-sm">
                ¿Ya tienes una cuenta? <a href="/login" className="text-blue-500 hover:underline">Inicia Sesión</a>
              </p>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;