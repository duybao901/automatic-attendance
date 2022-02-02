import React from 'react';
import { useSelector } from 'react-redux'
import { RootStore } from "../../../utils/interface"
import TeacherRow from '../teacher-row/TeacherRow';
import "./Teacher.scss"

const Teacher = () => {

    const { teacher } = useSelector((state: RootStore) => state)

    return <div className="dashbroad__body">
        <div className="teacher__tabel">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Ngày Tạo</th>
                        <th style={{ textAlign: "center" }}>Hành Động</th>

                    </tr>
                </thead>
                <tbody>
                {
                    teacher.teachers?.map((teacher, index) => {
                        return <TeacherRow teacher={teacher} key={index} />
                    })
                }
                </tbody>
            </table>
        </div>
    </div>
};

export default Teacher;
