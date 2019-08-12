import axios from "axios";

export const registerUser = (user, history)  => {
	axios
		.post("/register", user)
		.then(res => history.push("/sign-in"))
		.catch(err => {
			console.log(err)
		});
};

export const loginUser = (user, history)  => {
	axios
		.post("/authenticate", user)
		.then(res => {
            console.log(res,"res")
			res.data && localStorage.setItem("token", res.data.token);
			history.push("/dashboard");
			return res;
		})
		.catch(err => {
			console.log(err)
		});
};
