import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/Reservation.module.css';
import axiosInstance from '../axiosInstance';

const Reservation = () => {
    const currentDate = new Date();
    const maxDate = new Date().setDate(currentDate.getDate() + 6);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [timeslots, setTimeslots] = useState([]);

    useEffect(() => {
        getReservations(selectedDate);
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        getReservations(date);
    };

    const getReservations = async (date) => {
        try {
            const response = await axiosInstance.get('/broadcast/reservations', {
                params: {
                    date: date.toISOString().split('T')[0]
                }
            });
            setTimeslots(response.data.data);
        } catch (error) {
            setTimeslots([]);
        }
    };

    const handleReservation = async (slot) => {
        if (slot.reserved) {
            return;
        }

        try {
            const response = await axiosInstance.post('/broadcast/reservation',
                {
                    airtime: `${selectedDate.toISOString().split('T')[0]}T${slot.time}`
                }, {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                }
            }
            );

            alert(response.data.message);

        } catch (error) {
            if (error.response.data.message) {
                alert(`${error.response.data.message}`);
            }
        }
        getReservations(selectedDate);
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');

        return `${hours}시 ${minutes}분`;
    };

    return (
        <div className={styles.reservationContainer}>
            <div className={styles.calendar}>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={currentDate}
                    maxDate={maxDate}
                    inline
                    dateFormat="yyyy-MM-dd"
                />
            </div>
            <div className={styles.timeslots}>
                {timeslots.map((slot, index) => (
                    <div key={index} className={styles.timeslot}>
                        <span className={slot.reserved ? styles.unavailableText : styles.availableText}>{formatTime(slot.time)}</span>
                        <button className={slot.reserved ? styles.unavailable : styles.available} onClick={() => handleReservation(slot)}>
                            {slot.reserved === true ? '마감' : '예약'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reservation;
