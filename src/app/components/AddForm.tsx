'use client';
import { FC } from "react"

type AddFormProps = {
    process: number | string
}

const AddForm: FC<AddFormProps> = ({ process }) => {
    return (
        <div className="min-h-full p-8 rounded-xl flex flex-col shadow-lg bg-white">
            <div>
                <h1 className="font-bold text-2xl">Process</h1>
                <p>A contact will be unenrolled from this sequence in any of these case.</p>
                <p>5 steps - 3 complete</p>
            </div>
            <div>
                <div>
                    <p>Step 1</p>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
      )

}

export default AddForm