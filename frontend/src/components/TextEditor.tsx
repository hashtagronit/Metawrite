import {type ChangeEvent } from "react";

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
  return (
    <div className="mt-2">
        <div className="w-full mb-4  ">
            <div className="flex items-center justify-between">
            <div className="my-2 bg-white rounded-lg w-full">
                <label className="sr-only ">Publish Blog</label>
                <textarea onChange={onChange} id="editor" rows={8} className="w-full bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
  )
}

export default TextEditor
