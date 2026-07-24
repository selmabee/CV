import UploadZone from '../components/editor/UploadZone';
import CVEditor from '../components/editor/CVEditor';
import { useCV } from '../context/CVContext';

export default function BuilderPage() {
  const { step } = useCV();

  return (
    <div>
      {step === 'landing' && <UploadZone />}
      {step === 'upload' && <UploadZone />}
      {step === 'editor' && <CVEditor />}
    </div>
  );
}
