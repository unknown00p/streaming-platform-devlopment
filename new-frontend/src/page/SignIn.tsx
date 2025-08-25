import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Define Zod schemas for validation
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path of the error
});


const SignIn = () => {
  const [activeTab, setActiveTab] = useState('signIn');

  // React Hook Form for Sign In
  const { register: registerSignIn, handleSubmit: handleSubmitSignIn, formState: { errors: errorsSignIn } } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // React Hook Form for Sign Up
  const { register: registerSignUp, handleSubmit: handleSubmitSignUp, formState: { errors: errorsSignUp } } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSignInSubmit = (data) => {
    console.log("Signing in with:", data);
    alert("Sign In Attempt (check console for data): " + JSON.stringify(data));
    // Add your sign-in API call here
  };

  const onSignUpSubmit = (data) => {
    console.log("Signing up with:", data);
    alert("Sign Up Attempt (check console for data): " + JSON.stringify(data));
    // Add your sign-up API call here
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto rounded-xl shadow-lg">
        <Tabs value={activeTab} className="w-full">
          <CardHeader className="text-center pb-0">
            <CardTitle className="text-3xl font-bold">
              {activeTab === 'signIn' ? 'Welcome Back!' : 'Join Us!'}
            </CardTitle>
            <CardDescription>
              {activeTab === 'signIn'
                ? "Enter your credentials to access your account."
                : "Create an account to get started."}
            </CardDescription>
            <div className="flex justify-center mt-4">
              <TabsList className="grid w-[200px] grid-cols-2">
                <TabsTrigger value="signIn" onClick={() => setActiveTab('signIn')}>
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signUp" onClick={() => setActiveTab('signUp')}>
                  Sign Up
                </TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>

          <TabsContent value="signIn" activeTab={activeTab}>
            <form onSubmit={handleSubmitSignIn(onSignInSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <Input
                    id="email-signin"
                    type="email"
                    placeholder="name@example.com"
                    {...registerSignIn("email")}
                    className="w-full rounded-md"
                  />
                  {errorsSignIn.email && (
                    <p className="text-red-500 text-sm">{errorsSignIn.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signin">Password</Label>
                  <Input
                    id="password-signin"
                    type="password"
                    placeholder="••••••••"
                    {...registerSignIn("password")}
                    className="w-full rounded-md"
                  />
                  {errorsSignIn.password && (
                    <p className="text-red-500 text-sm">{errorsSignIn.password.message}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-2">
                <Button type="submit" className="w-full rounded-md">
                  Sign In
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="signUp" activeTab={activeTab}>
            <form onSubmit={handleSubmitSignUp(onSignUpSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="name@example.com"
                    {...registerSignUp("email")}
                    className="w-full rounded-md"
                  />
                  {errorsSignUp.email && (
                    <p className="text-red-500 text-sm">{errorsSignUp.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="••••••••"
                    {...registerSignUp("password")}
                    className="w-full rounded-md"
                  />
                  {errorsSignUp.password && (
                    <p className="text-red-500 text-sm">{errorsSignUp.password.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password-signup">Confirm Password</Label>
                  <Input
                    id="confirm-password-signup"
                    type="password"
                    placeholder="••••••••"
                    {...registerSignUp("confirmPassword")}
                    className="w-full rounded-md"
                  />
                  {errorsSignUp.confirmPassword && (
                    <p className="text-red-500 text-sm">{errorsSignUp.confirmPassword.message}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-2">
                <Button type="submit" className="w-full rounded-md">
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default SignIn;