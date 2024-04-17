import { InferType, array, date, number, object, string } from "yup";

export interface ward {
    id: number,
    name: string,
}

const AdmissionSchema = object({
    id: number().required(),
    discharge_date: date().nullable(),
    createdAt: date().required(),
    updatedAt: date().nullable().required(),
    Patient: object({
        id: number().required(),
        name: string().required(),
        tracking_no: string().required(),
        dob: date().required(),
        gender: string().required(),
    }).required(),
    Bed: object({
        id: number().required(),
        Ward: object({
            id: number().required(),
            name: string().required(),
        }).required()
    })
}).required();

const CarePlanSchema = object({
    id: number().required(),
    condition: string().required(),
    diagnosis: string().required(),
    treatmentPlan: string().required(),
}).required();


export const PatientRecordSchema = object({
    admission: AdmissionSchema,
    carePlan: CarePlanSchema,
});

export const NursingLogSchema = array(object({
    id: number().required(),
    note: string().required(),
    Staff: object({ name: string().required() }).nullable(),
    createdAt: date().required(),
    updatedAt: date().nullable().required(),
})).required();


export type Admission = InferType<typeof AdmissionSchema>;
export type CarePlan = InferType<typeof CarePlanSchema>;
export type PatientRecord = InferType<typeof PatientRecordSchema>;
export type NursingLog = InferType<typeof NursingLogSchema>;