import AppointmentsTable from './components/AppointmentsTable';
import SearchBar from './components/SearchBar';

const Appointments = () => {
    

    return (
        <div>
            <SearchBar onSearch={function (_results: any[]): void {
                throw new Error('Function not implemented.');
            } }/>
            <AppointmentsTable />
        </div>
    );
}

export default Appointments;
