import React from "react";
import "./CreateNews.scss";

const CreateNews = () => {
	//   const handleSubmit = () => {
	//     // let payload = {
	//     //     title,
	//     //     descritpition,
	//     //     author,
	//     //     dateOfNews,
	//     //     image,
	//     //     videoLink,
	//     // category - should be a dropdown
	//     // }
	//   };
	return (
		<div>
			<div className="blog-form">
				<form>
					<div className="title">
						<label htmlFor="title">Title</label>
						<input type="text" placeholder="Title" />
					</div>
					<div className="author">
						<label htmlFor="title">Author</label>
						<input type="text" placeholder="Author" />
					</div>
					<div className="videolink">
						<label htmlFor="title">VideoLink</label>
						<input type="text" placeholder="https://youtube.leyu12" />
					</div>
					<div className="image">
						<label htmlFor="title">Upload Image</label>
						<input
							type="file"
							id="image"
							name="image"
							accept="image/png, image/jpeg"
						/>
					</div>
					<div className="desc">
						<label htmlFor="desc">Description</label>
						<textarea
							name="desc"
							id=""
							rows="10"
							placeholder="Description"
						></textarea>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateNews;
