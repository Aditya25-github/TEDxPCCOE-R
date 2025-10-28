import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { BsFillAlarmFill } from "react-icons/bs";
import { SLOTS } from "../../data/homeData";  // Import the slots from your data

export default function Schedule() {
  return (
    <section id="event" style={{ background: "#000", padding: "40px 0" }}>
      <h2
        style={{
          fontWeight: "bold",
          color: "#fff",
          textAlign: "center",
          fontSize: "2.6rem",
          marginBottom: "32px",
          fontFamily: "Montserrat, Arial, sans-serif",
        }}
      >
        Program <span style={{ color: "#FE2A06" }}>Schedule</span>
      </h2>
      <VerticalTimeline>
        {SLOTS.map((slot, idx) => (
          <VerticalTimelineElement
            key={idx}
            contentStyle={{ background: "#FE2A06", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #FE2A06" }}
            date={slot.time}
            iconStyle={{ background: "#FE2A06", color: "#fff" }}
            icon={<BsFillAlarmFill />}
          >
            <h3 className="vertical-timeline-element-subtitle">{slot.title}</h3>
            {slot.speaker && (
              <h4 style={{ fontWeight: "bold" }}>{slot.speaker}</h4>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}
