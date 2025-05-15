import React, { useState } from 'react';
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import label from "../components/ui/label";
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
} from "../components/ui/form";
import { motion } from 'framer-motion';

// Define el esquema de validación para el formulario de inicio de sesión
const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
});

// Define el tipo para los datos del formulario
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Inicializa el formulario con react-hook-form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // Usa zod para la validación del esquema
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Función que se llama al enviar el formulario
  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setLoginError(null); // Resetea cualquier error anterior
    // Aquí iría la lógica para enviar la petición de inicio de sesión al backend
    try {
      // Simulando una petición exitosa
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Datos del formulario:', data);
      // Autenticar al usuario y obtener el token JWT
      // Si la autenticación es exitosa, redirigir al usuario a la página principal
      // Si no, mostrar un mensaje de error
      if (data.email === 'test@example.com' && data.password === 'password123') {
        // Autenticación exitosa
        console.log('Inicio de sesión exitoso');
        // Redirigir a la página principal
        // window.location.href = '/'; // No uses window.location.href en React, usa react-router-dom
      } else {
        // Autenticación fallida
        setLoginError('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
      }

    } catch (error: any) {
      setLoginError(error.message || 'Ocurrió un error al iniciar sesión.');
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
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
            <p className="text-center text-gray-500 text-sm">
              ¿No tienes una cuenta? <a href="/register" className="text-blue-500 hover:underline">Regístrate</a>
            </p>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default LoginPage;