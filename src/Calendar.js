import React, { useEffect, useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/th"; // นำเข้าภาษาไทย
import "react-big-calendar/lib/css/react-big-calendar.css";
import data from "./data.json";
import "./MyCalendar.css";

moment.locale("th"); // ตั้งค่า moment เป็นภาษาไทย

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  const convertToEvents = useCallback((data) => {
    return data.map((item) => ({
      title: (
        <>
          วาร: {item.วาร}&nbsp; ค่ำ: {item.ค่ำ}&nbsp; เดือนจีน: {item.เดือนจีน}
          &nbsp;
          <br />
          ราศีปี: {item.ราศีจีน}
          <br />
          ราศีเดือน: {item.ราศีเดือน}&nbsp; ราศีวัน: {item.ราศีวัน}
        </>
      ),
      // แปลงปี ค.ศ. เป็น พ.ศ.
      start: new Date(item.ปี - 543, convertMonth(item.เดือน), item.วันที่),
      end: new Date(item.ปี - 543, convertMonth(item.เดือน), item.วันที่ + 1),
    }));
  }, []);

  const convertMonth = (monthName) => {
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    return months.indexOf(monthName);
  };

  const dayPropGetter = (date) => {
    const today = new Date();
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return { style: { backgroundColor: "#fc7171" } }; // เปลี่ยนสีพื้นหลังวันที่ปัจจุบัน
    }
    return {};
  };

  useEffect(() => {
    const calendarEvents = convertToEvents(data);
    setEvents(calendarEvents);
  }, [convertToEvents]);

  return (
    <div style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        dayPropGetter={dayPropGetter} // เพิ่มฟังก์ชันนี้เข้าไป
        style={{ height: 700, margin: "50px" }}
      />
    </div>
  );
};

export default MyCalendar;
