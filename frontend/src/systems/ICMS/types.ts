import { InferType, array, date, number, object, string, bool } from "yup";

const PatientSchema = object({
    id: number().required(),
    name: string().required(),
    tracking_no: string().required(),
    dob: date().required(),
    gender: string().required(),
});

export const WardSchema = object({
    id: number().required(),
    name: string().required(),
});


const WaitListSchema = object({
    id: number().required(),
    reason: string().required(),
    is_priority: bool().required(),
    createdAt: date().required(),
    Patient: PatientSchema
});

export const BedSchema = object({
    id: number().required(),
    number: number().required(),
    Ward: WardSchema.required(),
    IPDAdmissionId: number().nullable(),
});

const AdmissionSchema = object({
    id: number().required(),
    discharge_date: date().nullable(),
    createdAt: date().required(),
    updatedAt: date().nullable().required(),
    Patient: PatientSchema.required(),
    Bed: BedSchema.nullable(),
}).required();


export const CarePlanSchema = object({
    id: number().required(),
    condition: string().required(),
    diagnosis: string().required(),
    treatmentPlan: string().required(),
}).required();


export const PatientRecordSchema = object({
    admission: AdmissionSchema,
    carePlan: CarePlanSchema.nullable(),
});

export const NursingLogSchema = array(object({
    id: number().required(),
    note: string().required(),
    Staff: object({ name: string().required() }).nullable(),
    createdAt: date().required(),
    updatedAt: date().nullable().required(),
})).required();




export const WardArraySchema = array(WardSchema).required();
export const BedArraySchema = array(BedSchema).required();
export const WaitListArraySchema = array(WaitListSchema).required();
export const AdmissionListSchema = array(AdmissionSchema).required();

export type Admission = InferType<typeof AdmissionSchema>;
export type CarePlan = InferType<typeof CarePlanSchema>;
export type PatientRecord = InferType<typeof PatientRecordSchema>;
export type NursingLog = InferType<typeof NursingLogSchema>;
export type WaitList = InferType<typeof WaitListSchema>;
export type Ward = InferType<typeof WardSchema>;
export type Bed = InferType<typeof BedSchema>;
