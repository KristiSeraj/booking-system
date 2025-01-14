import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAppointmentById } from "../utils/appointmentApi";
import { useAppointment } from "../context/AppointmentContext";

const AppointmentDetails = () => {
    const { id } = useParams();
    const { token, user } = useAuth();
    const { updateAppointment } = useAppointment();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleStatus = async (id, status) => {
      await updateAppointment(id, status);
    }

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                setLoading(true);
                const response = await getAppointmentById(token, id);
                setAppointment(response.data);
            } catch (error) {
                console.log('Error fetching appointment', error);
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
        fetchAppointment();
    }, [id, token]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
      <div className="max-w-lg mx-auto w-full bg-white border border-gray-200 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Appointment Details</h2>
          <span className={`text-lg font-bold ${appointment.status === 'Booked' ? 'text-blue-600' : appointment.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
            {appointment.status}
          </span>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <p className="text-gray-600 font-medium">Customer:</p>
            <p className="text-lg text-gray-800">{appointment.customer?.name}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Provider:</p>
            <p className="text-lg text-gray-800">{appointment.provider?.name}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Service:</p>
            <p className="text-lg text-gray-800">{appointment.service?.title}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Date & Time:</p>
            <p className="text-lg text-gray-800 uppercase">{new Date(appointment.dateTime).toLocaleString('en-GB', { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</p>
          </div>
        </div>


        <div className="flex justify-center items-center space-x-10">
          {user.role === 'provider' && appointment.status === 'Booked' && (
            <button onClick={() => handleStatus(appointment._id, 'Completed')} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200">
              Mark as Completed
            </button>
          )}
          {appointment.status === 'Booked' && (
            <button onClick={() => handleStatus(appointment._id, 'Canceled')} className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200">
              Cancel Appointment
            </button>
          )}
        </div>
      </div>
    );
};

export default AppointmentDetails;