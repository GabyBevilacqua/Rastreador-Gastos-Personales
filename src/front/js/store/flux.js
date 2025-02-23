const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			registerUser: [],
			authToken: null, // Añadir token de autenticación
			user: null // Añadir informacion del usuario

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// Acción para registrar un usuario
			registerUser: async (formData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/users", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message); // Lanza el mensaje del backend
					}

					const data = await response.json();
					return true; // Registro exitoso
				} catch (error) {
					console.error("Error al registrar el usuario:", error.message);
					throw error; // Lanza el error al componente
				}
			},

		
			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",					
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password }),
					});
					const data = await resp.json();
                    if (resp.ok) {
                        setStore({ user: data.user });
                        return true;
                    } else {
                        console.error("Login failed:", data.message);
                        return false;
                    }
                } catch (error) {
                    console.log("Error logging in", error);
                    return false;
                }
            },

			logout : () => {
				setStore({ authToken: null, user: null });

			},

			categorize: async ({ price, description }) => {
				try {
					const date = new Date().toISOString(); // Obtiene la fecha actual en formato ISO
					const resp = await fetch(process.env.BACKEND_URL + "api/categorize_expenses", {
						method: "POST",
						body: JSON.stringify({ price, description, user_id: getStore().user.id, date }),
						headers: {
							"Content-Type": "application/json"
						}
					});
					const data = await resp.json();
					console.log(data);
					getActions().fetchExpenses();
	//				setStore({categorize: data});
				} catch (error) {
					console.log("Error categorizing", error);
				}
			},

			fetchExpenses : async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL +`api/expenses/${getStore().user.id}`);
					if (!response.ok) {
						throw new Error("Error fetching expenses");
					}
					const data = await response.json();
					setStore({expenses: data});
				} catch (error) {
					console.error("Error fetching gastos:", error);
				}
			},

			deleteExpense: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL +`api/expenses/${id}`, {
						method: "DELETE"
					});
					if (!response.ok) {
						throw new Error("Error deleting expense");
					}
					const data = await response.json();
					getActions().fetchExpenses();
				} catch (error) {
					console.error("Error deleting expense:", error);
				}
			},

			// llama la informacion de nuevo si se refresca la pagina
			getData : () =>{
				const data = localStorage.getItem("authToken") || null;
				const user = JSON.parse(localStorage.getItem("user")) || null;
				setStore({ authToken: data, user : user});

			},
	

// ----------------------------------------------------------------------------------

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
