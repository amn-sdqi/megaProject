import Service from "../../appwrite/config.appwrite";
import { Link } from "react-router-dom";
function postCard({ $id, title, postImage }) {
	return (
		<Link to={`/post/${$id}`}>
			<div className="w-full bg-gray-100 rounded-xl p-4">
				<div className="w-full bg-gray-100 rounded-xl p-4">
					<img
						src={Service.filePreview(postImage)}
						alt={title}
						className="rounded-xl"
					/>
				</div>
				<h2 className="text-xl font-bold">{title}</h2>
			</div>
		</Link>
	);
}

export default postCard;
