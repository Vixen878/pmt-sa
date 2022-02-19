import { useParams } from 'react-router-dom';
import { UseDocument } from '../hooks/useDocument';
import RequestSummary from './RequestSummary';

export default function PendingProject() {

    const { id } = useParams()

    const { document, error } = UseDocument("requests", id);

    if (error) {
        return <div className="text-red-900">{error}</div>
    }

    if (!document) {
        return <div>Loading...</div>
    }

    return (
        <div className='w-full h-full'>
            <RequestSummary request={document}/>
        </div>
    )
}
