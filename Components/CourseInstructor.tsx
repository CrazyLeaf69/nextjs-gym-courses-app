import { ArrowRight, Calendar, Clock, Location, People } from "iconsax-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

type props = {
  course: CourseObjectAdmin;
  instructors: InstructorsAdmin[];
};

const CourseInstructor = ({ course, instructors }: props) => {
  const instructorIdArr = course.Instructors?.split(",");
  const courseInstructors = instructorIdArr?.map((id) => instructors.find((x) => x.UserId == parseInt(id)));

  return (
    <div key={course.CourseId} className="workout-container">
      <div>
        <div className="workout-name">{course.Name}</div>
        <div className="workout-desc">{course.Description}</div>
        <div className="flex flex-row gap-5 mb-2">
          <div>
            <div className="font-bold text-xs">Bodypart:</div>
            <div>{course.BodyPart}</div>
          </div>
          <div>
            <div className="font-bold text-xs">Code:</div>
            <div>{course.DepartmentId}</div>
          </div>
        </div>
        <div className="mb-1">
          <span className="font-bold">Instructors: </span>
          <span>
            {courseInstructors != null
              ? courseInstructors.map((courseInstructor, i) => (
                  <span key={i}>
                    {i > 0 && ", "}
                    {courseInstructor?.FirstName} {courseInstructor?.LastName}
                  </span>
                ))
              : "Unknown"}
          </span>
        </div>
        <Link href={`/instructor?tab=courses&id=${course.CourseId}`} shallow={true}>
          <button className="edit-btn">
            Inspect <ArrowRight size="20" />
          </button>
        </Link>
      </div>
      <div>
        <div className="workout-time">
          <Calendar size="17" color="black" className="icon" />
          {course.EveryWeek == 1 ? (
            <div>Every {moment(course.StartTime).format("dddd")}</div>
          ) : (
            <div>{moment(course.StartTime).format("DD MMM")}</div>
          )}
        </div>
        <div className="workout-attends">
          <Clock size="17" color="black" className="icon" />
          {course.StartTime.split("T")[1]} - {course.EndTime.split("T")[1]}
        </div>
        <div className="workout-attends">
          <People size="17" color="black" className="icon" />
          {course.Attends?.split(",").length || 0}/{course.MaxAttendants}
        </div>
        <div className="workout-attends">
          <Location size="17" color="black" className="icon" />
          <span className="atd text-sm whitespace-normal md:whitespace-nowrap">{course.FacilityName}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseInstructor;
