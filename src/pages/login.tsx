import { useState } from "react"
import * as Yup from "yup"
import { useFormik } from "formik"
import {toast} from "sonner";

import { Button } from "../components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

import {
  User,
  Mail,
  Lock,
  UserCheck,
  Eye,
  EyeOff
} from "lucide-react"
import { useDispatch } from "react-redux";
import { addUser } from "@/utils/userSlice";
import { useNavigate } from "react-router-dom";



export default function AuthPage() {
    const dispatch=useDispatch();
    const navigate=useNavigate();

  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const signUpValidation = Yup.object({
    firstName: Yup.string()
      .min(2, "Minimum 2 characters are required")
      .max(50, "Max 50 characters are allowed")
      .required("First Name is required"),

    lastName: Yup.string()
      .min(2, "Minimum 2 characters are required")
      .max(50, "Max 50 characters are allowed")
      .required("Last Name is required"),

    gender: Yup.string()
      .oneOf(["male", "female", "others"], "Invalid gender")
      .required("Gender is required"),

    emailId: Yup.string()
      .email("Please enter a valid email address")
      .required("Email id is required"),

    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .matches(/[A-Z]/, "Must contain one uppercase letter")
      .matches(/[a-z]/, "Must contain one lowercase letter")
      .matches(/[0-9]/, "Must contain one digit")
      .matches(/[#$%^&*@]/, "Must contain a special character")
      .required("Password is required"),
  })


  const loginValidation = Yup.object({
    emailId: Yup.string()
      .email("Please enter a valid email address")
      .required("Email id is required"),

    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("Password is required"),
  })


  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ]


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      emailId: "",
      password: "",
    },
    validationSchema: isLogin ? loginValidation : signUpValidation,
    onSubmit: async(values,{resetForm}) => {
      try{
       const response=await fetch(`http://localhost:4500/auth/${isLogin?"login":"signup"}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(values),
        credentials:"include"
       })
       if(!response.ok){
        throw new Error(`${isLogin?"failed to login":"failed to sign up"}`);
       }
       const data=await response.json();
      
       
       if(data.success){
        dispatch(addUser(data.data))
       }
       toast.success(isLogin?"Logged in successfully":"Signed up successfully")
       resetForm();
       navigate("/");


      }catch(err){
        if(err instanceof Error)
        console.error(err.message)
        toast.error(isLogin?"failed to login":"failed to signup")
      }
    }
  })


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md"
      >

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <FieldGroup>

          {/* SIGNUP FIELDS */}

          {!isLogin && (
            <>

              {/* FIRST NAME */}

              <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>

                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className="pl-9"
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>

                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
                )}
              </Field>


              {/* LAST NAME */}

              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>

                <div className="relative">
                  <UserCheck className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="pl-9"
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>

                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
                )}
              </Field>


              {/* GENDER */}

              <Field>
                <FieldLabel>Gender</FieldLabel>

                <Select
                  value={formik.values.gender}
                  onValueChange={(value) => {
                    formik.setFieldValue("gender", value)
                    formik.setFieldTouched("gender", true)
                  }}
                >

                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {genders.map((gender) => (
                        <SelectItem key={gender.value} value={gender.value}>
                          {gender.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>

                </Select>

                {formik.touched.gender && formik.errors.gender && (
                  <p className="text-red-500 text-sm">{formik.errors.gender}</p>
                )}

              </Field>

            </>
          )}



          {/* EMAIL */}

          <Field>
            <FieldLabel htmlFor="emailId">Email</FieldLabel>

            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                id="emailId"
                name="emailId"
                type="email"
                placeholder="john@example.com"
                className="pl-9"
                value={formik.values.emailId}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>

            <FieldDescription>
              We'll never share your email.
            </FieldDescription>

            {formik.touched.emailId && formik.errors.emailId && (
              <p className="text-red-500 text-sm">{formik.errors.emailId}</p>
            )}
          </Field>



          {/* PASSWORD */}

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <div className="relative">

              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="pl-9 pr-9"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              <button
                type="button"
                className="absolute right-3 top-2.5 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>

            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

          </Field>



          {/* BUTTONS */}

          <Field orientation="horizontal" className="flex gap-2 pt-2">

            <Button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsLogin(!isLogin)
                formik.resetForm()
              }}
            >
              {isLogin ? "Create account" : "Login"}
            </Button>

          </Field>

        </FieldGroup>

      </form>
    </div>
  )
}