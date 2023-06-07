
type DocumentsFieldsProps = {
  onClose: () => void;
}

const DocumentsFields: React.FC<DocumentsFieldsProps> = ({ onClose }) => {

  return (
    <>
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button onClick={onClose} className=" bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className=" text-base text-gray-700">Add New Document</h1></div>
        <div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <h2 className=" text-2xl text-gray-700 mb-8">Document Details</h2>
        <div className=" w-full grid gap-4 grid-cols-3">
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Title</label>
            <input className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" type="text" placeholder="Enter first name" />
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">File Upload</label>
            <input className="block w-full mb-5 bg-gray-100 border-2 rounded px-3 py-1 text-xs text-gray-700 cursor-pointer focus:outline-none" id="small_size" type="file" />
          </div>
          <div className="col-span-3">
            <label className="text-gray-700 text-xs mb-1 block">Description</label>
            <textarea rows={5} className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" placeholder="Enter description for test..." />
          </div>
        </div>

      </div>
    </>
  )
}

export default DocumentsFields;