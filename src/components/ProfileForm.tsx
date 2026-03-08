import { useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "sonner"

import Shimmer from "./Shimmer"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { User, ImageIcon } from "lucide-react"

export default function ProfileForm() {

  const user = useSelector((store:any)=>store.user)

  if(!user){
    return <Shimmer/>
  }

  const validationSchema = Yup.object({

    firstName:Yup.string()
      .min(2,"Minimum 2 characters required")
      .required("First name required"),

    lastName:Yup.string()
      .min(2,"Minimum 2 characters required")
      .required("Last name required"),

    age:Yup.number()
      .min(16,"Minimum age is 16")
      .max(100,"Invalid age"),

    photourl:Yup.string()
      .url("Invalid URL"),

    about:Yup.string()
      .max(300,"Max 300 characters allowed")

  })

  const formik = useFormik({

    enableReinitialize:true,

    initialValues:{
      firstName:user.firstName || "",
      lastName:user.lastName || "",
      age:user.age || "",
      photourl:user.photourl || "",
      about:user.about || "",
      skills:user.skills || []
    },

    validationSchema,

    onSubmit: async(values)=>{

      try{

        const response = await fetch("http://localhost:4500/profile/edit",{
          method:"PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify(values)
        })

        if(!response.ok){
          throw new Error("Failed to update profile")
        }

        const data = await response.json()

        if(data.success){
          toast.success("Profile updated successfully")
        }

      }catch(err){
        toast.error("Failed to update profile")
      }

    }

  })

  return (

    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 p-6 bg-white rounded-xl shadow-sm"
    >

      <FieldGroup>

        {/* FIRST NAME */}

        <Field>

          <FieldLabel htmlFor="firstName">First Name</FieldLabel>

          <div className="relative">

            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>

            <Input
              name="firstName"
              placeholder="John"
              className="pl-9"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

          </div>

          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-sm text-red-500">{formik.errors.firstName as string}</p>
          )}

        </Field>


        {/* LAST NAME */}

        <Field>

          <FieldLabel htmlFor="lastName">Last Name</FieldLabel>

          <Input
            name="lastName"
            placeholder="Doe"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-sm text-red-500">{formik.errors.lastName as string}</p>
          )}

        </Field>


        {/* AGE */}

        <Field>

          <FieldLabel htmlFor="age">Age</FieldLabel>

          <Input
            name="age"
            type="number"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

        </Field>


        {/* PROFILE PHOTO */}

        <Field>

          <FieldLabel htmlFor="photourl">Profile Photo URL</FieldLabel>

          <div className="relative">

            <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>

            <Input
              name="photourl"
              placeholder="https://example.com/photo.jpg"
              className="pl-9"
              value={formik.values.photourl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

          </div>

        </Field>


        {/* ABOUT */}

        <Field>

          <FieldLabel htmlFor="about">About</FieldLabel>

          <Textarea
            name="about"
            rows={4}
            placeholder="Tell developers about yourself..."
            value={formik.values.about}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

        </Field>


        {/* SKILLS */}

        <Field>

          <FieldLabel>Skills (comma separated)</FieldLabel>

          <Input
            placeholder="React, Node, MongoDB"
            value={formik.values.skills.join(", ")}
            onChange={(e)=>{
              const skillsArray = e.target.value
                .split(",")
                .map(skill => skill.trim())
                .filter(skill => skill.length > 0)

              formik.setFieldValue("skills", skillsArray)
            }}
          />

        </Field>


        {/* SAVE BUTTON WITH TOOLTIP */}

        <Field orientation="horizontal" className="pt-2">

          <TooltipProvider>

            <Tooltip>

              <TooltipTrigger asChild>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!formik.dirty}
                >
                  Save Changes
                </Button>

              </TooltipTrigger>

              <TooltipContent>
                Save your profile changes
              </TooltipContent>

            </Tooltip>

          </TooltipProvider>

        </Field>

      </FieldGroup>

    </form>
  )
}