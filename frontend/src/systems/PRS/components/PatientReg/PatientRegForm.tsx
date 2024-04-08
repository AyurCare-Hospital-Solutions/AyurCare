import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    name: string
    nic: string
    phone: string
    dob: Date
    gender: string
    email: string
    address: string
    tracking_no: number
}



export default function PatientRegForm() {

    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
  

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} >
            <input {...register("name", { required: true, maxLength: 20 })} />
            <input {...register("nic", { required: true, maxLength: 20 })} />
            {/* <input {...register("", { pattern: /^[A-Za-z]+$/i })} />
            <input type="number" {...register("age", { min: 18, max: 99 })} />
            <input type="submit" /> */}
        </form>
    </div>
  )
}
