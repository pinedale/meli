
import { useParams } from 'react-router-dom';
import { useGetChecklistSection } from './services';
import { TableMain } from '../table';

const TableSection: React.FC = () => {
	const { checklistId, categoryId } = useParams()

	const { data } = useGetChecklistSection(checklistId, categoryId);
	console.log("🚀 ~ file: index.tsx:28 ~ dass:", data)

	return (
		<div>
			{
				data?.sections?.map(item => (
					<div>
						<h2>{item.title}</h2>
						<div className="overflow-hidden border rounded-lg mb-10">
							<TableMain dataSection={data.sections}/>
						</div>
					</div>
				))
			}
		</div>
	)
};

export default TableSection;