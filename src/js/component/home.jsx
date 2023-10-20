
import React, { useState, useEffect } from "react";




//create your first component
const Home = () => {
const API_URL= "https://playground.4geeks.com/apis/fake/todos/user/mery";
const [tarea, setTarea] = useState({
	"label": "",
	"done": false
});

const [tareaLista, setTareaLista] = useState([]);

const handleChange = (event) => {
	setTarea({
		...tarea,
		"label": event.target.value
	});
};

const handleDelete = (label) => {
	const nuevaTareaLista = tareaLista.filter((item) => item.label !== label);
	updateTareaLista(nuevaTareaLista);
};

const updateTareaLista = async (nuevaLista) => {
	try {
		let response = await fetch(API_URL, {
			method: "PUT",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(nuevaLista)
		});
		if (response.ok) {
			setTareaLista(nuevaLista);
		}
	} catch (error) {
		console.log(error);
	}
};

const saveTarea = async (event) => {
	if (event.key === "Enter") {
		try {
			let response = await fetch(API_URL, {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify([...tareaLista, tarea])
			});
			if (response.ok) {
				getTarea();
				setTarea({
					"label": "",
					"done": false
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
};

const getTarea = async () => {
	try {
		let response = await fetch(API_URL);
		if (response.ok) {
			let data = await response.json();
			setTareaLista(data);
		}
	} catch (error) {
		console.log(error);
	}
};

useEffect(() => {
	getTarea();
}, []);

return (
	<div className="container">
		<div className="row justify-content-center">
			<div className="col-12 col-md-6">
				<h2>Todo List</h2>
				<input
					type="text"
					placeholder="Agrega la tarea"
					className="form-control"
					name="label"
					value={tarea.label}
					onChange={handleChange}
					onKeyDown={saveTarea}
				/>
				<ul className="mt-4">
					{tareaLista.map((item, index) => {
						return (
							<li className="d-flex justify-content-between"key={index}>{item.label}  
							<button
								className="btn btn-outline-danger btn-delete "
								onClick={() => handleDelete(item.label)}
							>
						 x                                </button>
						</li>
						)
					})}
				</ul>
			</div>
		</div>
	</div>
   );
}



export default Home;

