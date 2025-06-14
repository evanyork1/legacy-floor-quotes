
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import type { FormData } from './types';
import { ExamplePhoto } from './ExamplePhoto';

interface Step3Props {
  formData: FormData;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'exterior' | 'damage') => void;
  removePhoto: (index: number, type: 'exterior' | 'damage') => void;
}
export const Step3ExteriorPhotos = ({
  formData,
  handleFileUpload,
  removePhoto
}: Step3Props) => <div className="space-y-6 sm:space-y-8">
    <div className="text-center mb-8 sm:mb-12 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Upload Photos - Exterior View</h2>
      <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">*Optional for now, however we will need them to create an exact estimate.</p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 max-w-2xl mx-auto">
        <p className="text-blue-800 font-medium text-sm sm:text-base">📸 Please take photos showing the whole space or all spaces from the exterior</p>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 max-w-2xl mx-auto mt-3 sm:mt-4">
        <p className="text-green-800 font-semibold text-xs sm:text-sm">💡 Upload as many pictures as you can; the more, the better!</p>
      </div>
    </div>

    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Example Photo:</h3>
        <ExamplePhoto
          src="/lovable-uploads/c131885b-6fd6-4475-afeb-d13b0d895942.png"
          alt="Example garage exterior view"
        />
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-12 text-center hover:border-blue-400 transition-colors">
        <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
        <p className="text-base sm:text-lg font-medium text-gray-700 mb-2">Drop exterior photos here or click to browse</p>
        <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">JPG, PNG up to 10MB each</p>
        <input type="file" multiple accept="image/*" onChange={e => handleFileUpload(e, 'exterior')} className="hidden" id="exterior-upload" />
        <label htmlFor="exterior-upload">
          <Button asChild className="cursor-pointer text-sm sm:text-base"><span>Choose Photos</span></Button>
        </label>
      </div>

      {formData.exteriorPhotos.length > 0 && <div className="mt-6 sm:mt-8">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Uploaded Exterior Photos ({formData.exteriorPhotos.length})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {formData.exteriorPhotos.map((photo, index) => <div key={index} className="relative group">
            <img src={URL.createObjectURL(photo)} alt={`Exterior ${index + 1}`} className="w-full h-20 sm:h-24 object-cover rounded-lg" />
            <button onClick={() => removePhoto(index, 'exterior')} className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              ×
            </button>
          </div>)}
        </div>
      </div>}
    </div>
  </div>;
