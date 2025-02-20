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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// This is the function that will be called from the component
			// and will fetch the data from the backend
			login: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						body: JSON.stringify(formData),
						headers: {
							"Content-Type": "application/json"
						}
					});
					const data = await resp.json();
					console.log(data);
					setStore({user: data.user});
				} catch (error) {
					console.log("Error logging in", error);
				}
			},

			categorize: async ({ price, description}) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/categorize_expenses", {
						method: "POST",
						body: JSON.stringify({ price, description, user_id: getStore().user.id }),
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
