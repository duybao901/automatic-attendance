import React, { useState } from 'react'
import "./LessonBody.scss"

const LessonBody = () => {

    const [search, setSearch] = useState<string>("");

    return (
        <div className="dashbroad__body lesson__body">
            <div className="lesson__body-control">
                <form>
                    <input type='text'></input>
                </form>
            </div>
        </div>
    )
}

export default LessonBody