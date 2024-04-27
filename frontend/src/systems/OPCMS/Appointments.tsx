import AppointmentsTable from './components/AppointmentsTable';

const Appointments = () => {
    

    return (
        <div>
            <h1>Appointments</h1>
            <AppointmentsTable onProfileClick={(patientId) => console.log(patientId)} />
        </div>
    );
}

export default Appointments;
