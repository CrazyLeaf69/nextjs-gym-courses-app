import { NextPage } from "next";
import React from "react";

type props = {
  students: [StudentsAdmin];
};

const StudentsTab: NextPage<props> = ({ students }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Course(s)</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const courseNames = student.Attends?.split(/[,:]/)
              .filter((_, i) => (1 + i) % 2 == 0)
              .join(", ");

            return (
              <tr key={student.UserId}>
                <td>{student.UserId}</td>
                <td>{student.FirstName}</td>
                <td>{student.LastName}</td>
                <td>{student.Email}</td>
                <td>{courseNames}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default StudentsTab;